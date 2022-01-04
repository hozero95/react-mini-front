import axios from "axios";

/* 로그인 API */
export const login = async (loginId, loginPassword, onSetToken, onSetUserInfo) => {
    let result = false;

    await axios.post('http://localhost:8000/api/auth/signin', {
        "userId": loginId,
        "userPassword": loginPassword
    }).then(async res1 => {
        onSetToken(res1.data.token);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + res1.data.token
        };
        axios.defaults.headers.post = null;
        await axios.get('http://localhost:8000/api/auth/user', {
            headers
        }).then(res2 => {
            onSetUserInfo(res2.data);

            result = true;
        }, error => {
            alert('회원 정보를 불러오는데 실패했습니다.');
        });
    }, error => {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
    });

    return result;
};

/* 회원가입 API */
export const regist = async (registId, registPassword) => {
    let result = false;

    await axios.post('http://localhost:8000/api/auth/signup', {
        "userId": registId,
        "userPassword": registPassword
    }).then(res => {
        result = true;
    }, error => {
        alert('회원가입에 실패했습니다.');
    });

    return result;
};