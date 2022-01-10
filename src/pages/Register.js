import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {shallowEqual, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {regist} from "../apis/authApi";

const Register = () => {
    const token = useSelector(state => state.token.token, shallowEqual);

    const history = useHistory();

    const [registId, setRegistId] = useState('');
    const [idError, setIdError] = useState('');

    const [registPassword, setRegistPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [tel, setTel] = useState('');
    const [telError, setTelError] = useState('');

    /* Register 페이지가 렌더링 될 때 로그인 상태 검사 */
    useEffect(() => {
        if (token !== null && token !== '') {
            alert("이미 로그인중입니다.");
            history.push("/");
        }
    }, [history, token]);

    /* 폼 리셋 */
    const resetForm = () => {
        setRegistId('');
        setRegistPassword('');
        setRepeatPassword('');
        setPostcode('');
        setDetailAddress('');
        setExtraAddress('');
        setEmail('');
        setTel('');
    };

    /* 에러 리셋 */
    const resetErrors = () => {
        setIdError('');
        setPasswordError('');
        setRepeatPasswordError('');
        setAddressError('');
        setEmailError('');
        setTelError('');
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
        if (!repeatPassword) {
            setRepeatPasswordError('비밀번호를 확인해주세요.');
            validated = false;
        }
        if (!postcode) {
            setAddressError('주소를 입력해주세요.');
            validated = false;
        }
        if (!email) {
            setEmailError('이메일을 입력해주세요.');
            validated = false;
        }
        if (!tel) {
            setTelError('연락처를 입력해주세요.');
            validated = false;
        }

        return validated;
    };

    /* 비밀번호 체크 */
    const checkPassword = (e) => {
        setRepeatPassword(e.target.value);

        if (registPassword !== e.target.value) {
            setRepeatPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setRepeatPasswordError('');
        }
    };

    /* 이메일 체크 */
    const checkEmail = (e) => {
        var reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!reg.test(e.target.value)) {
            setEmailError('이메일 형식에 맞지 않습니다.');
        } else {
            setEmailError('');
        }
    };

    /* 연락처 체크 */
    const checkTel = (e) => {
        setTelError('');
        setTel(e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, '$1'));
        var number = e.target.value.replace(/[^0-9]/g, "");
        var phone = "";
        if (number.length < 4) {
            phone = number;
        } else if (number.length < 7) {
            phone += number.substr(0, 3);
            phone += "-";
            phone += number.substr(3);
        } else if (number.length < 11) {
            phone += number.substr(0, 3);
            phone += "-";
            phone += number.substr(3, 3);
            phone += "-";
            phone += number.substr(6);
        } else {
            phone += number.substr(0, 3);
            phone += "-";
            phone += number.substr(3, 4);
            phone += "-";
            phone += number.substr(7);
        }
        setTel(phone);
    };

    /* 회원가입 API logic */
    const registSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            let registResult = await regist(registId, registPassword, postcode, address, detailAddress, extraAddress, email, tel);
            if (registResult) {
                /* 회원가입 성공 시 에러메세지, 폼 리셋 후 Home으로 이동 */
                resetErrors();
                resetForm();
                alert('회원가입에 성공했습니다.\n로그인 페이지로 이동합니다.');
                history.push("/login");
            }
        }
    };

    /* 우편번호 찾기 */
    const postcodeService = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if (data.userSelectedType === 'R') {
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    setExtraAddress(extraAddr);
                    setAddressError('');
                } else {
                    setExtraAddress('');
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                setPostcode(data.zonecode);
                setAddress(addr);
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("detailAddress").focus();
            }
        }).open();
    };

    return (
        <Container fluid="lg" style={{padding: '0'}}>
            <Row className="justify-content-md-center" lg="4">
                <Card style={{margin: '100px', padding: '0'}}>
                    <Card.Header>Register</Card.Header>
                    <Card.Body>
                        <Form onSubmit={registSubmit} autoComplete="off">
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" placeholder="아이디" value={registId}
                                              onChange={e => {
                                                  setRegistId(e.target.value);
                                                  setIdError('');
                                              }}/>
                                <div style={{color: 'red'}}>{idError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호" value={registPassword}
                                              onChange={e => {
                                                  setRegistPassword(e.target.value);
                                                  setPasswordError('');
                                              }}/>
                                <div style={{color: 'red'}}>{passwordError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Repeat Password</Form.Label>
                                <Form.Control type="password" placeholder="비밀번호 확인" value={repeatPassword}
                                              onChange={e => checkPassword(e)}/>
                                <div style={{color: 'red'}}>{repeatPasswordError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Row className="align-items-center">
                                    <Col>
                                        <Form.Control type="text" placeholder="우편번호" value={postcode} readOnly
                                                      onChange={e => {
                                                          setPostcode(e.target.value);
                                                      }}/>
                                    </Col>
                                    <Col xs="auto">
                                        <Button onClick={postcodeService}>우편번호 찾기</Button>
                                    </Col>
                                </Row>
                                <Form.Control type="text" className="my-2" placeholder="주소" value={address}
                                              onChange={e => {
                                                  setAddress(e.target.value);
                                              }}/>
                                <Row className="align-items-center">
                                    <Col>
                                        <Form.Control type="text" id="detailAddress" placeholder="상세주소"
                                                      value={detailAddress}
                                                      onChange={e => {
                                                          setDetailAddress(e.target.value);
                                                      }}/>
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="참고항목" value={extraAddress}
                                                      onChange={e => {
                                                          setExtraAddress(e.target.value);
                                                      }}/>
                                    </Col>
                                </Row>
                                <div style={{color: 'red'}}>{addressError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="이메일" value={email}
                                              onChange={e => {
                                                  setEmail(e.target.value);
                                                  checkEmail(e);
                                              }}/>
                                <div style={{color: 'red'}}>{emailError}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tel</Form.Label>
                                <Form.Control type="text" placeholder="연락처" value={tel}
                                              onChange={e => {
                                                  checkTel(e);
                                              }}/>
                                <div style={{color: 'red'}}>{telError}</div>
                            </Form.Group>
                            <Button variant="primary" type="submit" lg="3" className="mt-2">
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