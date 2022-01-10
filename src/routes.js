/* 페이지 라우팅 */
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Board from "./pages/Board";
import UserList from "./pages/UserList";

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
            },
            {
                path: '/productList',
                component: ProductList
            },
            {
                path: '/userList',
                component: UserList
            },
            {
                path: '/board',
                component: Board
            }
        ]
    );
};

export default routes();