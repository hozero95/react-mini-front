import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import routes from './routes'
import NavList from "./components/NavList";
import {Container} from "react-bootstrap";

const App = () => {
    return (
        <Container fluid style={{padding: '0'}}>
            {/* Router 적용 */}
            <BrowserRouter>
                <NavList/>
                {/* Switch + map을 이용해 Route 적용 */}
                <Switch>
                    {routes.map(route => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact
                            >
                                <route.component/>
                            </Route>
                        );
                    })};
                </Switch>
            </BrowserRouter>
        </Container>
    );
};

export default App;
