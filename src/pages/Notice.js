import React, {useEffect, useState} from "react";
import {Button, Container, Row} from "react-bootstrap";
import {shallowEqual, useSelector} from "react-redux";
import {setNoticesGrid} from "../realgrid/setGrid";
import {useHistory} from "react-router-dom";

let container, provider, gridView;

const Notice = () => {
    const token = useSelector(state => state.token.token, shallowEqual);
    const userInfo = useSelector(state => state.token.userInfo, shallowEqual);

    const history = useHistory();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token !== null && token !== '') {
            const authorities = userInfo.authorities;
            if (typeof authorities !== 'undefined') {
                if (authorities.length < 2) {
                    setIsAdmin(true);
                }
            }
        }

        /* RealGrid */
        container = document.getElementById("realgrid");

        /* 데이터를 담기 위한 LocalDataProvider 객체 생성 */
        // eslint-disable-next-line no-undef
        provider = new RealGrid.LocalDataProvider(false);

        /* 데이터를 보여주기 위한 GridView 객체 생성 */
        // eslint-disable-next-line no-undef
        gridView = new RealGrid.GridView(container);
        gridView.setDataSource(provider);

        setNoticesGrid(provider, gridView, token, history);
    }, [history, token, userInfo]);

    const setPrevPage = () => {
        let currentPage = gridView.getPage();
        gridView.setPage(currentPage - 1);
    };

    const setNextPage = () => {
        let currentPage = gridView.getPage();
        gridView.setPage(currentPage + 1);
    };

    const onNewDetail = () => {
        history.push('/noticeDetail/new');
    };

    return (
        <Container fluid="lg" style={{padding: '0'}}>
            <h1>Notice</h1>
            <Button onClick={setPrevPage} size="sm" className="m-2">이전페이지</Button>
            <span id="current-page-view"></span>
            /
            <span id="total-page-view"></span>
            <Button onClick={setNextPage} size="sm" className="m-2">다음페이지</Button>
            <Button onClick={onNewDetail} hidden={isAdmin} size="sm" className="m-2">글쓰기</Button>
            <Row className="justify-content-md-center mb-2">
                <div id="realgrid" style={{width: "100%", height: "430px"}}></div>
            </Row>
        </Container>
    );
};

export default Notice;