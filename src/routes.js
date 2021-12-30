import Home from "./pages/Home";
import Login from "./pages/Login";

const routes = () => {
    return (
        [
            {
                path: '/',
                component: Home
            },
            {
                path: '/login',
                component: Login
            }
        ]
    );
};

export default routes();