import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";

export function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
// all은 한번에 전부 동시에 실행시켜주는 것이고 fork는 제너레이터 함수를 실행해준다는것
// call은 함수를 불러오긴하지만 동기 함수이다
// fork도 함수를 불러오며 비동기식으로 함수를 불러온다
//
