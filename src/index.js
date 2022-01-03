import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./modules";
import 'bootstrap/dist/css/bootstrap.min.css';
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from 'redux-thunk';

/* 스토어 생성 */
const store = createStore(
    rootReducer,
    // logger를 사용하는 경우, logger가 가장 마지막에 와야한다.
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))
); // 여러 개의 미들웨어 적용 가능

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
