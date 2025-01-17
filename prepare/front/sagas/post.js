import { all, fork, put, takeLatest, delay, call, throttle } from "redux-saga/effects";
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
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE
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

function loadHashtagPostsAPI(data, lastId) {
  console.log("tlfgodg")
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
  console.log("loadHashtagPosts 실행");
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({ type: LOAD_HASHTAG_POSTS_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: LOAD_HASHTAG_POSTS_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  console.log("loadUserPosts 실행");
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({ type: LOAD_USER_POSTS_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: LOAD_USER_POSTS_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  console.log("loadPosts 실행");
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({ type: LOAD_POSTS_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: LOAD_POSTS_FAILURE, error: err.response.data });
  }
} // put 디스패치



function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  console.log("eodd", action.data)
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  console.log("addPost 실행");
  try {
    const result = yield call(addPostAPI, action.data);
    console.log("Saga_appPost", result)
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

function uploadImagesAPI(data) {
  return axios.post("/post/images", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    console.log("uploadImages입니다", result)
    yield put({ type: UPLOAD_IMAGES_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: UPLOAD_IMAGES_FAILURE, error: err.response.data });
  }
} // put 디스패치

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({ type: RETWEET_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: RETWEET_FAILURE, error: err.response.data });
  }
} // put 디스패치

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
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

function* watchuploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchRetweet),
    fork(watchuploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchLoadPosts),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
