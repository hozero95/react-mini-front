import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./reducers";
import 'bootstrap/dist/css/bootstrap.min.css';
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

/* 스토어 생성 */
const store = createStore(
    rootReducer,
    /* redux-logger: 액션 함수가 실행되는 로그를 콘솔에 출력 */
    /* redux-thunk: 액션 객체뿐만 아니라 함수의 dispatch를 가능하게 해줌 */
    // logger를 사용하는 경우, logger가 가장 마지막에 와야한다.
    // composeWithDevTools(applyMiddleware(ReduxThunk, logger)) // 여러 개의 미들웨어 적용 가능
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

/* persist store 생성 */
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
