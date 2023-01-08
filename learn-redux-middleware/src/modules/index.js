import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
// all 함수를 사용해, 제너레이터 함수를 배열로 넣으면
// 제너레이터 함수들이 동시 실행, 전부 resolve 될 때까지 기다림.
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
