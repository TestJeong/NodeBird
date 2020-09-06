import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    console.log("saga run", action.data);
    //const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({ type: "LOG_IN_SUCCESS", data: action.data });
  } catch (err) {
    yield put({ type: "LOG_IN_FAILURE", data: err.response.data });
  }
} // put 디스패치

function logOutAPI() {
  return axios.post("/api/logOut");
}

function* logOut() {
  try {
    //const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({ type: "LOG_OUT_SUCCESS" });
  } catch (err) {
    yield put({ type: "LOG_OUT_FAILURE", data: err.response.data });
  }
} // put 디스패치

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
} // LOG_IN 액션이 실행될때 까지 기다다리며 액션이 실행되면 logIn 제너레이터 함수가 실행됨

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
