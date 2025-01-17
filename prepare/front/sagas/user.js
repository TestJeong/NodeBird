import { all, fork, put, takeLatest, delay, call } from "redux-saga/effects";
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
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  UPLOAD_AVATAR_IMAGE_REQUEST,
  UPLOAD_AVATAR_IMAGE_SUCCESS,
  UPLOAD_AVATAR_IMAGE_FAILURE,
  CHANGE_AVATAR_IMAGE_REQUEST,
  CHANGE_AVATAR_IMAGE_SUCCESS,
  CHANGE_AVATAR_IMAGE_FAILURE,
  RECOMMEND_FOLLOW_LIST_REQUEST,
  RECOMMEND_FOLLOW_LIST_SUCCESS,
  RECOMMEND_FOLLOW_LIST_FAILURE,
} from "../reducers/user";

function changeNicknameAPI(data) {
  return axios.patch("/user/nickname", { nickname: data });
}

function* changeNickname(action) {
  console.log("사가 실행");
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({ type: CHANGE_NICKNAME_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: CHANGE_NICKNAME_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action) {
  console.log("사가 실행");
  try {
    console.log("saga run", action.data);
    const result = yield call(loadUserAPI, action.data);
    yield put({ type: LOAD_USER_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_USER_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfo() {
  console.log("사가 실행");
  try {
    const result = yield call(loadMyInfoAPI);
    console.log("loadMy", result);
    yield put({ type: LOAD_MY_INFO_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_MY_INFO_FAILURE, error: err.response.data });
  }
} // put 디스패치

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`, data);
}

function* follow(action) {
  console.log("사가 실행");
  try {
    console.log("saga run", action.data);
    const result = yield call(followAPI, action.data);
    yield put({ type: FOLLOW_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: FOLLOW_FAILURE, error: err.response.data });
  }
} // put 디스패치

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  console.log("사가 실행");
  try {
    console.log("saga run", action.data);
    const result = yield call(unfollowAPI, action.data);
    yield delay(1000);
    yield put({ type: UNFOLLOW_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: UNFOLLOW_FAILURE, error: err.response.data });
  }
} // put 디스패치

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  console.log("사가 실행");
  try {
    console.log("saga run", action.data);

    const result = yield call(logInAPI, action.data);
    yield put({ type: LOG_IN_SUCCESS, data: result.data });
  } catch (err) {
    console.error(err);
    yield put({ type: LOG_IN_FAILURE, error: err.response.data });
  }
} // put 디스패치

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({ type: LOG_OUT_SUCCESS });
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE, error: err.response.data });
  }
} // put 디스패치

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  console.log("sign saga실행");
  try {
    const result = yield call(signUpAPI, action.data);
    console.log("sign saga 값", result.data);
    yield put({ type: SIGN_UP_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadFollowersAPI(data) {
  return axios.get("/user/followers", data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    console.log("팔로워", result.data);
    yield put({ type: LOAD_FOLLOWERS_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: LOAD_FOLLOWERS_FAILURE, error: err.response.data });
  }
} // put 디스패치

function loadFollowingsAPI(data) {
  return axios.get("/user/followings", data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    console.log("팔로잉", result.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    console.log(result);
    yield put({ type: REMOVE_FOLLOWER_SUCCESS, data: result.data });
  } catch (err) {
    yield put({ type: REMOVE_FOLLOWER_FAILURE, error: err.response.data });
  }
} // put 디스패치

function uploadAvatarAPI(data) {
  return axios.post(`/user/avatar`, data);
}

function* uploadAvatar(action) {
  console.log("uploadAvatar 실행");
  try {
    const result = yield call(uploadAvatarAPI, action.data);
    console.log(result);
    yield put({ type: UPLOAD_AVATAR_IMAGE_SUCCESS, data: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_AVATAR_IMAGE_FAILURE,
      error: error.response.data,
    });
  }
} // put 디스패치

function recommendFollowListAPI(data) {
  return axios.get(`/user/recommend`, data);
}

function* recommendFollowList(action) {
  console.log("recommendFollowList 실행");
  try {
    const result = yield call(recommendFollowListAPI, action.data);
    console.log("recommendFollowList", result);
    yield put({ type: RECOMMEND_FOLLOW_LIST_SUCCESS, data: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: RECOMMEND_FOLLOW_LIST_FAILURE,
      error: error.response.data,
    });
  }
} // put 디스패치

function changeAvatarAPI(data) {
  return axios.post(`/user/changeavatar`, data);
}

function* changeAvatar(action) {
  console.log("Change Avatar 실행");
  try {
    const result = yield call(changeAvatarAPI, action.data);
    console.log("Saga_Change Avatar", result);
    yield put({ type: CHANGE_AVATAR_IMAGE_SUCCESS, data: result.data });
  } catch (error) {
    console.error(error);
    yield put({
      type: CHANGE_AVATAR_IMAGE_FAILURE,
      error: error.response.data,
    });
  }
} // put 디스패치

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
} // LOG_IN 액션이 실행될때 까지 기다다리며 액션이 실행되면 logIn 제너레이터 함수가 실행됨

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchUploadAvatar() {
  yield takeLatest(UPLOAD_AVATAR_IMAGE_REQUEST, uploadAvatar);
}

function* watchChangeAvatar() {
  yield takeLatest(CHANGE_AVATAR_IMAGE_REQUEST, changeAvatar);
}

function* watchRecommendFollowList() {
  yield takeLatest(RECOMMEND_FOLLOW_LIST_REQUEST, recommendFollowList);
}

export default function* userSaga() {
  yield all([
    fork(watchRecommendFollowList),
    fork(watchChangeAvatar),
    fork(watchUploadAvatar),
    fork(watchRemoveFollower),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchChangeNickname),
    fork(watchLoadUser),
    fork(watchLoadMyInfo),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
