import React, {useEffect, useState} from "react";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {shallowEqual, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const Register = () => {
    const token = useSelector(state => state.token.token, shallowEqual);

    const history = useHistory();

    const [registId, setRegistId] = useState('');
    const [registPassword, setRegistPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    /* Register 페이지가 렌더링 될 때 로그인 상태 검사 */
    useEffect(() => {
        // if (localStorage.getItem("token") !== null) {
        if (token !== null && token !== '') {
            alert("이미 로그인중입니다.");
            history.push("/");
        }
    }, [history, token]);

    /* 폼 리셋 */
    const resetForm = () => {
        setRegistId('');
        setRegistPassword('');
    }

    /* 에러 리셋 */
    const resetErrors = () => {
        setIdError('');
        setPasswordError('');
    };

    /* 회원가입 유효성 검사 */
    const validateForm = () => {
        resetErrors();
        let validated = true;

        if (!registId) {
            setIdError('아이디를 입력해주세요.');
            validated = false;
        }
        if (!registPassword) {
            setPasswordError('비밀번호를 입력해주세요.');
            validated = false;
        }

        return validated;
    };

    /* 회원가입 API logic */
    const registSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            axios.post('http://localhost:8000/api/auth/signup', {
                "userId": registId,
                "userPassword": registPassword
            }).then(res1 => {
                /* 회원가입 성공 시 에러메세지, 폼 리셋 후 Home으로 이동 */
                resetErrors();
                resetForm();
                alert('회원가입에 성공했습니다.\n로그인 페이지로 이동합니다.');
                history.push("/login");
            }, error => {
                alert('회원가입에 실패했습니다.\n' + error);
            });
        }
    };

    return (
        <Container fluid style={{padding: '0'}}>
            <Row className="justify-content-md-center" lg="4">
                <Card style={{margin: '100px', padding: '0'}}>
                    <Card.Header>Register</Card.Header>
                    <Card.Body>
                        <Form onSubmit={registSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter ID" value={registId}
                                              onChange={e => setRegistId(e.target.value)}/>
                                <div style={{color: 'red'}}>{idError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={registPassword}
                                              onChange={e => setRegistPassword(e.target.value)}/>
                                <div style={{color: 'red'}}>{passwordError}</div>
                            </Form.Group>
                            <Button variant="primary" type="submit" lg="3">
                                Regist
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default Register;