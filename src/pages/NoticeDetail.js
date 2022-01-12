import React, {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {useHistory, useParams} from "react-router";
import {shallowEqual, useSelector} from "react-redux";
import {addNotices, deleteNotices, getNotices, updateNotices, viewNotices} from "../apis/noticesApi";
import FroalaComps from "../components/FroalaComps";

const NoticeDetail = () => {
    const token = useSelector(state => state.token.token, shallowEqual);
    const userInfo = useSelector(state => state.token.userInfo, shallowEqual);

    const params = useParams();
    const history = useHistory();

    const [isAdmin, setIsAdmin] = useState(true);
    const [isNew, setIsNew] = useState(false);
    const [notice, setNotice] = useState({}); // Promise
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [views, setViews] = useState(0);

    useEffect(() => {
        if (params.noticeUnum === 'new') {
            if (token !== null && token !== '') {
                const authorities = userInfo.authorities;
                if (typeof authorities !== 'undefined') {
                    if (authorities.length < 2) {
                        alert('관계자 외 출입금지');
                        history.push('/notice');
                    }
                }
            } else {
                alert('관계자 외 출입금지');
                history.push('/notice');
            }

            setIsNew(true);
        } else {
            getNotices(params.noticeUnum).then(data => {
                setNotice(data);
                setTitle(data.title);
                setContent(data.content);
                setViews(++data.views);
                viewNotices(token, data);
            });
        }

        if (token !== null && token !== '') {
            const authorities = userInfo.authorities;
            if (typeof authorities !== 'undefined') {
                if (authorities.length < 2) {
                    setIsAdmin(false);
                }
            }
        }
    }, [history, params.noticeUnum, token, userInfo]);

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onBack = () => {
        history.push('/notice');
    };

    const onCreate = () => {
        let data = notice;
        data.title = title;
        data.content = content;

        if (title === '') {
            alert('제목을 작성하세요.');
        } else if (content === '') {
            alert('내용을 작성하세요.');
        } else {
            addNotices(token, data).then(() => {
                history.push('/notice');
            });
        }
    };

    const onDelete = () => {
        deleteNotices(token, notice.noticeUnum).then(() => {
            history.push('/notice');
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        let data = notice;
        data.title = title;
        data.content = content;
        data.views = views;

        updateNotices(token, data).then(() => {
            history.push('/notice');
        });
    };

    return (
        <Container fluid="lg" style={{padding: '0'}}>
            <h1>Notice Detail</h1>
            <Form onSubmit={onSubmit} autoComplete="off">
                <Form.Group className="mb-4">
                    <Form.Label>Title</Form.Label>
                    <Form.Control readOnly={!isAdmin} defaultValue={notice != null ? notice.title : ''}
                                  onChange={onTitleChange}/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>Content</Form.Label>
                    <FroalaComps
                        content={notice != null ? notice.content : ''}
                        setContent={setContent}
                        readOnly={isAdmin}
                    />
                </Form.Group>
                <Button onClick={onBack} variant="primary" type="button" lg="3" className="m-1">
                    Ok
                </Button>
                <Button onClick={onCreate} variant="success" type="button" lg="3" className="m-1" hidden={!isNew}>
                    Save
                </Button>
                <Button variant="success" type="submit" lg="3" className="m-1" hidden={!isAdmin || isNew}>
                    Update
                </Button>
                <Button onClick={onDelete} variant="danger" type="button" lg="3" className="m-1"
                        hidden={!isAdmin || isNew}>
                    Delete
                </Button>
            </Form>
        </Container>
    );
};

export default NoticeDetail;