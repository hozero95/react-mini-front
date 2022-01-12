import React, {useEffect, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setToken, setUserInfo} from "../reducers/token";
import {useHistory} from "react-router-dom";

const NavList = () => {
    const token = useSelector(state => state.token.token, shallowEqual);
    const userInfo = useSelector(state => state.token.userInfo, shallowEqual);

    const dispatch = useDispatch();
    const onSetToken = token => dispatch(setToken(token));
    const onSetUserInfo = userInfo => dispatch(setUserInfo(userInfo));

    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const history = useHistory();

    /* 토큰, 유저 정보 상태가 변하면 토근 여부 상태를 갱신 */
    useEffect(() => {
        if (token !== null && token !== '') {
            setIsLogin(true);
        }

        const authorities = userInfo.authorities;
        if (typeof authorities !== 'undefined') {
            if (authorities.length > 1) {
                setIsAdmin(true);
            }
        }
    }, [token, userInfo]);

    /* 로그아웃 */
    const logout = () => {
        /* redux store 초기화 */
        onSetToken('');
        onSetUserInfo({});

        setIsLogin(false);
        setIsAdmin(false);
        alert('로그아웃 되었습니다.');
        history.push('/');
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container>
                <Navbar.Brand href="/" style={{cursor: "pointer"}}>React-Mini-Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {/*<Nav.Link href="/productList">ProductList</Nav.Link>*/}
                        <Nav.Link href="/notice">Notice</Nav.Link>
                        <Nav.Link href="/userList" hidden={!isAdmin}>UserList</Nav.Link>
                        {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                        {/*    <NavDropdown.Item>Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider/>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    <Nav>
                        <Navbar.Text hidden={!isLogin}>{userInfo.userId}님
                            환영합니다.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</Navbar.Text>
                        <Nav.Link href="/myPage" hidden={!isLogin}>MyPage</Nav.Link>
                        <Nav.Link onClick={logout} hidden={!isLogin}>Logout</Nav.Link>
                        <Nav.Link href="/login" hidden={isLogin}>Login</Nav.Link>
                        <Nav.Link href="/register" hidden={isLogin}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavList;