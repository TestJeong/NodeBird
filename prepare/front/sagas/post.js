import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post";

function addPostAPI(data) {
  return axios.post("/api/post");
}

function* addPost(action) {
  console.log("addPost 실행");
  try {
    //const result = yield call(addPostAPI);
    yield delay(1000);
    yield put({ type: ADD_POST_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, error: err.response.data });
  }
} // put 디스패치

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    //const result = yield call(addCommentAPI);
    yield delay(1000);
    yield put({ type: ADD_COMMENT_SUCCESS, data: action.data });
  } catch (err) {
    yield put({ type: ADD_COMMENT_FAILURE, error: err.response.data });
  }
} // put 디스패치

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}