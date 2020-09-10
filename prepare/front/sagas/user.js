import { all, fork, put, takeLatest, delay, take } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  HOHO,
} from "../reducers/user";

function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  console.log("사가 실행");
  try {
    console.log("saga run", action.data);
    //const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({ type: LOG_IN_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: LOG_IN_FAILURE, error: err.response.data });
  }
} // put 디스패치

function logOutAPI() {
  return axios.post("/api/logOut");
}

function* logOut() {
  try {
    //const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
  }
} // put 디스패치

function signUpAPI() {
  return axios.post("/api/logOut");
}

function* signUp() {
  try {
    //const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
  }
} // put 디스패치

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
} // LOG_IN 액션이 실행될때 까지 기다다리며 액션이 실행되면 logIn 제너레이터 함수가 실행됨

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchSignUp)]);
}
