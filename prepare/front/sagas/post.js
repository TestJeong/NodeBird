import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortid from "shortid";

function addPostAPI(data) {
  return axios.post("/api/post");
}

function* addPost(action) {
  console.log("addPost 실행");
  try {
    //const result = yield call(addPostAPI);
    yield delay(1000);
    const id = shortid.generate();
    yield put({ type: ADD_POST_SUCCESS, data: { id, content: action.data } });
    yield put({ type: ADD_POST_TO_ME, data: id });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, error: err.response.data });
  }
} // put 디스패치

function removePostAPI(data) {
  return axios.delete("/api/post");
}

function* removePost(action) {
  console.log("removePost 실행");
  try {
    //const result = yield call(removePostAPI);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({ type: REMOVE_POST_OF_ME, data: action.data });
  } catch (err) {
    yield put({ type: REMOVE_POST_FAILURE, error: err.response.data });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  console.log(action.data);
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

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
