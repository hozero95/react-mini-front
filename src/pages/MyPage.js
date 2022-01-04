import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";

const MyPage = () => {
    const token = useSelector(state => state.token.token, shallowEqual);
    const userInfo = useSelector(state => state.token.userInfo, shallowEqual);
    const history = useHistory();

    /* myPage가 렌더링 될 때 로그인 여부 검사 */
    useEffect(() => {
        // if (localStorage.getItem("token") === null) {
        if (token === null || token === '') {
            alert("로그인이 필요합니다.");
            history.push("/login");
        }
    }, [history, token]);

    /* 권한 리스트 출력 */
    const printAuthorities = () => {
        let result = '';
        for (let i = 0; i < userInfo.authorities.length; i++) {
            result += userInfo.authorities[i].authorityName;
            if (userInfo.authorities.length - 1 !== i) {
                result += ', ';
            }
        }
        return result
    }

    return (
        <Container fluid style={{padding: '0'}}>
            token: {token}<br/>
            userUnum: {userInfo.userUnum}<br/>
            userId: {userInfo.userId}<br/>
            authorities: {printAuthorities()}
        </Container>
    );
};

export default MyPage;