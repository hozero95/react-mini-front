import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"

import token from "./token";

/* persistReducer 정의 */
const persistConfig = {
    key: "root",
    // localStorage에 저장
    storage,
    // whitelist: localStorage에 저장하고 싶은 reducer 목록
    // blacklist: localStorage에 저장하고 싶지 않은 reducer 목록
    whitelist: ["token"]
};

/* rootReducer에 합칠 reducer 목록 */
const rootReducer = combineReducers({
    token
});

/* persistReducer로 persistConfig와 함께 reducer 목록을 export */
export default persistReducer(persistConfig, rootReducer);