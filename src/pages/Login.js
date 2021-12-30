import React, {useState} from "react";
import {Button, Card, Container, Form, Row} from "react-bootstrap";

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 폼 리셋
    const resetForm = () => {
        setLoginId('');
        setLoginPassword('');
    }

    // 에러 리셋
    const resetErrors = () => {
        setIdError('');
        setPasswordError('');
    };

    // 로그인 유효성 검사
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

    // 로그인
    const loginSubmit = (event) => {
        event.preventDefault(); // 테스트용

        if (validateForm()) {
            // axios 로직 추가

            resetErrors();
            resetForm();
            // eslint-disable-next-line no-restricted-globals
            location.href = '/';
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
                                              onChange={e => setLoginId(e.target.value)}/>
                                <div style={{color: 'red'}}>{idError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={loginPassword}
                                              onChange={e => setLoginPassword(e.target.value)}/>
                                <div style={{color: 'red'}}>{passwordError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me"/>
                            </Form.Group>
                            <Button variant="primary" type="submit" lg="3">
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