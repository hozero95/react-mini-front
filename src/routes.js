/* 페이지 라우팅 */
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Notice from "./pages/Notice";
import UserList from "./pages/UserList";
import NoticeDetail from "./pages/NoticeDetail";

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
                path: '/notice',
                component: Notice
            },
            {
                path: '/noticeDetail/:noticeUnum',
                component: NoticeDetail
            }
        ]
    );
};

export default routes();