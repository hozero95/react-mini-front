import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import routes from './routes'
import NavList from "./components/NavList";
import {Container} from "react-bootstrap";

const App = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <Container fluid style={{padding: '0'}}>
            <BrowserRouter>
                <NavList isLogin={isLogin} setIsLogin={setIsLogin}/>
                <Switch>
                    {routes.map(route => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact
                            >
                                <route.component isLogin={isLogin} setIsLogin={setIsLogin}/>
                            </Route>
                        );
                    })};
                </Switch>
            </BrowserRouter>
        </Container>
    );
};

export default App;
