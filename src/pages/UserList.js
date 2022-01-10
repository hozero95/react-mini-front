import React, {useEffect} from "react";
import {Button, Container, Pagination, Row} from "react-bootstrap";
import {setUsersGrid} from "../realgrid/setGrid";
import {shallowEqual, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

let container, provider, gridView;

const UserList = () => {
    const token = useSelector(state => state.token.token, shallowEqual);
    const userInfo = useSelector(state => state.token.userInfo, shallowEqual);

    const history = useHistory();

    /* 토큰, 유저 정보 상태가 변하면 토근 여부 상태를 갱신 */
    useEffect(() => {
        if (token !== null && token !== '') {
            const authorities = userInfo.authorities;
            if (typeof authorities !== 'undefined') {
                if (authorities.length < 2) {
                    alert('관계자 외 출입금지');
                    history.push('/');
                }
            }
        }
    }, [token, userInfo, history]);

    document.addEventListener("DOMContentLoaded", function () {
        container = document.getElementById("realgrid");

        /* 데이터를 담기 위한 LocalDataProvider 객체 생성 */
        // eslint-disable-next-line no-undef
        provider = new RealGrid.LocalDataProvider(false);

        /* 데이터를 보여주기 위한 GridView 객체 생성 */
        // eslint-disable-next-line no-undef
        gridView = new RealGrid.GridView(container);
        gridView.setDataSource(provider);

        setUsersGrid(provider, gridView, token);
    });

    return (
        <Container fluid="lg" style={{padding: "0"}}>
            <h1>User List</h1>
            <Row className="justify-content-md-center">
                <div id="realgrid" style={{width: "100%", height: "430px"}}></div>
            </Row>
        </Container>
    );
};

export default UserList;