/* Redux의 액션 함수가 실행될 때마다 로그를 남기는 기능 */
/* 현재 redux-devtools-extension로 대체하여 사용 안함 */

const myLogger = store => next => action => {
    console.log(action); // 액션 출력
    const result = next(action); // 다음 미들웨어 (또는 리듀서)에게 액션을 전달

    // 업데이트 이후의 상태 조회
    console.log('\t', store.getState());

    return result; // dispatch(action)의 결과 반환. default: undefined
};

export default myLogger;