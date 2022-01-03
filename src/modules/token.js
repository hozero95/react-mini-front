/* 액션 타입 정의 */
const SET_TOKEN = 'token/SET_TOKEN';
const SET_USERINFO = 'token/SET_USERINFO';

/* 액션 생성 함수 정의 */
export const setToken = token => ({
    type: SET_TOKEN,
    token
});
export const setUserInfo = userInfo => ({
    type: SET_USERINFO,
    userInfo
});

/* 초기 상태 선언 */
const initialState = {
    token: '',
    userInfo: {
        userUnum: '',
        userId: '',
        authorities: []
    }
}

/* 리듀서 선언 */
export default function token(state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case SET_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            };
        default:
            return state;
    }
}