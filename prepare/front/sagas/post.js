import { all, fork, put, takeLatest, delay, call } from "redux-saga/effects";
import axios from "axios";
import {
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  console.log("likePost 실행", action.data);
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({ type: LIKE_POST_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: LIKE_POST_FAILURE, error: err.response.data });
  }
} // put 디스패치

function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
  console.log("unLikePost 실행");
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({ type: UNLIKE_POST_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: UNLIKE_POST_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadPostsAPI(data) {
  return axios.get("/posts", data);
}

function* loadPosts(action) {
  console.log("loadPosts 실행");
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({ type: LOAD_POSTS_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: LOAD_POSTS_FAILURE, error: err.response.data });
  }
} // put 디스패치

function addPostAPI(data) {
  return axios.post("/post", { content: data });
}

function* addPost(action) {
  console.log("addPost 실행");
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({ type: ADD_POST_SUCCESS, data: result.data });
    yield put({ type: ADD_POST_TO_ME, data: result.data.id });
  } catch (err) {
    yield put({ type: ADD_POST_FAILURE, error: err.response.data });
  }
} // put 디스패치

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  console.log("removePost 실행", action);
  try {
    const result = yield call(removePostAPI, action.data);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({ type: REMOVE_POST_OF_ME, data: action.data });
  } catch (err) {
    yield put({ type: REMOVE_POST_FAILURE, error: err.response.data });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({ type: ADD_COMMENT_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: ADD_COMMENT_FAILURE, error: err.response.data });
  }
} // put 디스패치

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

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
  yield all([
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
