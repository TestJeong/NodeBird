import { all, fork, call, put, take } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({ type: "LOG_IN_SUCCESS", data: result.data });
  } catch (err) {
    yield put({ type: "LOG_IN_FAILURE", data: err.response.data });
  }
} // put 디스패치

function logOutAPI() {
  return axios.post("/api/logOut");
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    yield put({ type: "LOG_OUT_SUCCESS", data: result.data });
  } catch (err) {
    yield put({ type: "LOG_OUT_FAILURE", data: err.response.data });
  }
} // put 디스패치

function addPostAPI() {
  return axios.post("/api/post");
}

function* addPost() {
  try {
    const result = yield call(addPostAPI);
    yield put({ type: "ADD_POST_SUCCESS", data: result.data });
  } catch (err) {
    yield put({ type: "ADD_POST_FAILURE", data: err.response.data });
  }
} // put 디스패치

function* watchLogin() {
  yield take("LOG_IN_REQUEST", logIn);
} // LOG_IN 액션이 실행될때 까지 기다다리며 액션이 실행되면 logIn 제너레이터 함수가 실행됨

function* watchLogout() {
  yield take("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield take("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
// all은 한번에 전부 동시에 실행시켜주는 것이고 fork는 제너레이터 함수를 실행해준다는것
// call은 함수를 불러오긴하지만 동기 함수이다
// fork도 함수를 불러오며 비동기식으로 함수를 불러온다
