import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

function addPostAPI() {
  return axios.post("/api/post");
}

function* addPost() {
  try {
    //const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({ type: "ADD_POST_SUCCESS" });
  } catch (err) {
    yield put({ type: "ADD_POST_FAILURE", data: err.response.data });
  }
} // put 디스패치

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
