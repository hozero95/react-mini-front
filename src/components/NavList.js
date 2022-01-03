import React, {useEffect, useState} from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const NavList = ({isLogin, setIsLogin}) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            setIsLogin(true);
            setUserId(JSON.parse(localStorage.getItem("userInfo")).userId);
        }
    }, [setIsLogin, isLogin, userId]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        setIsLogin(false);
        setUserId('');
        alert("로그아웃 되었습니다.");
    };

    const history = useHistory();
    const onMoveHome = () => {
        history.push("/");
    };
    const onMoveLogin = () => {
        history.push("/login");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container>
                <Navbar.Brand onClick={onMoveHome}>React-Mini-Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={onMoveHome}>Home</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item>Action</NavDropdown.Item>
                            <NavDropdown.Divider/>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Navbar.Text hidden={!isLogin}>{userId}님 환영합니다.&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</Navbar.Text>
                        <Nav.Link onClick={logout} hidden={!isLogin}>Logout</Nav.Link>
                        <Nav.Link onClick={onMoveLogin} hidden={isLogin}>Login</Nav.Link>
                        <Nav.Link hidden={isLogin}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavList;