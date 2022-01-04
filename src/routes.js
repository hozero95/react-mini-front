/* 페이지 라우팅 */
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";

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
            },
            {
                path: '/register',
                component: Register
            },
            {
                path: '/myPage',
                component: MyPage
            }
        ]
    );
};

export default routes();