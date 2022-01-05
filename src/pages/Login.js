import React, {useEffect, useState} from "react";
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {setToken, setUserInfo} from '../reducers/token';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {login} from "../apis/authApi";

const Login = () => {
    const token = useSelector(state => state.token.token, shallowEqual);

    const dispatch = useDispatch();
    const onSetToken = token => dispatch(setToken(token));
    const onSetUserInfo = userInfo => dispatch(setUserInfo(userInfo));

    const history = useHistory();

    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    /* Login 페이지가 렌더링 될 때 로그인 상태 검사 */
    useEffect(() => {
        if (token !== null && token !== '') {
            alert("이미 로그인중입니다.");
            history.push("/");
        }
    }, [history]);

    /* 폼 리셋 */
    const resetForm = () => {
        setLoginId('');
        setLoginPassword('');
    }

    /* 에러 리셋 */
    const resetErrors = () => {
        setIdError('');
        setPasswordError('');
    };

    /* 로그인 유효성 검사 */
    const validateForm = () => {
        resetErrors();
        let validated = true;

        if (!loginId) {
            setIdError('아이디를 입력해주세요.');
            validated = false;
        }
        if (!loginPassword) {
            setPasswordError('비밀번호를 입력해주세요.');
            validated = false;
        }

        return validated;
    };

    /* 로그인 API logic */
    const loginSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            let loginResult = await login(loginId, loginPassword, onSetToken, onSetUserInfo);
            if (loginResult) {
                resetErrors();
                resetForm();
                alert(loginId + '님 환영합니다.');
                history.push('/');
            }
        }
    };

    return (
        <Container fluid style={{padding: '0'}}>
            <Row className="justify-content-md-center" lg="4">
                <Card style={{margin: '100px', padding: '0'}}>
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form onSubmit={loginSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter ID" value={loginId}
                                              onChange={e => {
                                                  setLoginId(e.target.value);
                                                  setIdError('');
                                              }}/>
                                <div style={{color: 'red'}}>{idError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={loginPassword}
                                              onChange={e => {
                                                  setLoginPassword(e.target.value);
                                                  setPasswordError('');
                                              }}/>
                                <div style={{color: 'red'}}>{passwordError}</div>
                            </Form.Group>
                            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                            {/*    <Form.Check type="checkbox" label="Remember me"/>*/}
                            {/*</Form.Group>*/}
                            <Button variant="primary" type="submit" lg="3" className="mt-1">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
};

export default Login;