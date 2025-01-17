import produce from "immer";

export const init = {
  avatarImage: [],

  recommendFollowList: null,

  recommendLoading: false,
  recommendDone: false,
  recommendError: false,

  loadUserLodading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: false,

  loadMyInfoLodading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: false,

  followLodading: false, // 팔로우 시도중
  followDone: false,
  followError: false,

  unfollowLodading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: false,

  removefollowerLodading: false, // 언팔로우 시도중
  removefollowerDone: false,
  removefollowerError: false,

  logInLodading: false, // 로그인 시도중
  logInDone: false,
  logInError: false,

  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,

  signUploading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,

  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,

  loadFollowersLoading: false, // 팔로워 목록 불러오는 중
  loadFollowersDone: false,
  loadFollowersError: null,

  loadFollowingsLoading: false, // 팔로잉 목록 불러오는 중
  loadFollowingsDone: false,
  loadFollowingsError: null,

  changeAvatarImageLoading: false,
  changeAvatarImageDone: false,
  changeAvatarImageError: null,

  changeAvatarUploadLoading: false,
  changeAvatarUploadDone: false,
  changeAvatarUploadError: null,

  me: null, // 로그인한 id와 paw가 저장
  userInfo: null,
};
//LOAD_MY_INFO_REQUEST

export const RECOMMEND_FOLLOW_LIST_REQUEST = "RECOMMEND_FOLLOW_LIST_REQUEST";
export const RECOMMEND_FOLLOW_LIST_SUCCESS = "RECOMMEND_FOLLOW_LIST_SUCCESS";
export const RECOMMEND_FOLLOW_LIST_FAILURE = "RECOMMEND_FOLLOW_LIST_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const UPLOAD_AVATAR_IMAGE_REQUEST = "UPLOAD_AVATAR_IMAGE_REQUEST";
export const UPLOAD_AVATAR_IMAGE_SUCCESS = "UPLOAD_AVATAR_IMAGE_SUCCESS";
export const UPLOAD_AVATAR_IMAGE_FAILURE = "UPLOAD_AVATAR_IMAGE_FAILURE";

export const CHANGE_AVATAR_IMAGE_REQUEST = "CHANGE_AVATAR_IMAGE_REQUEST";
export const CHANGE_AVATAR_IMAGE_SUCCESS = "CHANGE_AVATAR_IMAGE_SUCCESS";
export const CHANGE_AVATAR_IMAGE_FAILURE = "CHANGE_AVATAR_IMAGE_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data) => ({
  ...data,
  nickname: "YUN",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "부기초" },
    { nickname: "테스트1" },
    { nickname: "테스트2" },
  ],
  Followers: [
    { nickname: "부기초" },
    { nickname: "테스트1" },
    { nickname: "테스트2" },
  ],
});

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data, // data : data 이므로 LoginForm에서 dispatch로 전달받은loginAction의 인자값이 data이다
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};
//아전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성을 지키면서)
const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RECOMMEND_FOLLOW_LIST_REQUEST:
        draft.recommendLoading = true;
        draft.recommendError = null;
        draft.recommendDone = false;
        break;

      case RECOMMEND_FOLLOW_LIST_SUCCESS:
        draft.recommendLoading = false;
        draft.recommendDone = true;
        draft.recommendFollowList = action.data;
        break;

      case RECOMMEND_FOLLOW_LIST_FAILURE:
        draft.recommendLoading = false;
        draft.recommendError = action.error;
        break;

      case CHANGE_AVATAR_IMAGE_REQUEST:
        draft.changeAvatarImageLoading = true;
        draft.changeAvatarImageError = null;
        draft.changeAvatarImageDone = false;
        break;

      case CHANGE_AVATAR_IMAGE_SUCCESS:
        draft.changeAvatarImageLoading = false;
        draft.changeAvatarImageDone = true;
        draft.me.avatar = action.data;
        break;

      case CHANGE_AVATAR_IMAGE_FAILURE:
        draft.changeAvatarImageLoading = false;
        draft.changeAvatarImageError = action.error;
        break;

      case UPLOAD_AVATAR_IMAGE_REQUEST:
        draft.changeAvatarUploadLoading = true;
        draft.changeAvatarUploadError = null;
        draft.changeAvatarUploadDone = false;
        break;

      case UPLOAD_AVATAR_IMAGE_SUCCESS:
        draft.changeAvatarUploadLoading = false;
        draft.changeAvatarUploadDone = true;
        draft.avatarImage = action.data;
        break;

      case UPLOAD_AVATAR_IMAGE_FAILURE:
        draft.changeAvatarUploadLoading = false;
        draft.changeAvatarUploadError = action.error;
        break;

      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLodading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;

      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLodading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;

      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLodading = false;
        draft.loadMyInfoError = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.loadUserLodading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;

      case LOAD_USER_SUCCESS:
        draft.loadUserLodading = false;
        draft.loadUserDone = true;
        draft.userInfo = action.data;

        break;

      case LOAD_USER_FAILURE:
        draft.loadUserLodading = false;
        draft.loadUserError = action.error;
        break;

      case FOLLOW_REQUEST:
        draft.followLodading = true;
        draft.followError = null;
        draft.followDone = false;
        break;

      case FOLLOW_SUCCESS:
        draft.followLodading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data.UserId });
        break;

      case FOLLOW_FAILURE:
        draft.followLodading = false;
        draft.followError = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.unfollowLodading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;

      case UNFOLLOW_SUCCESS:
        draft.unfollowLodading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data.UserId
        ); //언팔로우 한사람만 빠진다
        break;

      case UNFOLLOW_FAILURE:
        draft.unfollowLodading = false;
        draft.unfollowError = action.error;
        break;

      case REMOVE_FOLLOWER_REQUEST:
        draft.removefollowerLodading = true;
        draft.removefollowerError = null;
        draft.removefollowerDone = false;
        break;

      case REMOVE_FOLLOWER_SUCCESS:
        draft.removefollowerLodading = false;
        draft.removefollowerDone = true;
        draft.me.Followers = draft.me.Followers.filter(
          (v) => v.id !== action.data.UserId
        ); //언팔로우 한사람만 빠진다
        break;

      case REMOVE_FOLLOWER_FAILURE:
        draft.removefollowerLodading = false;
        draft.removefollowerError = action.error;
        break;

      case LOG_IN_REQUEST:
        console.log("reducer run");

        draft.logInLodading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;

      case LOG_IN_SUCCESS:
        console.log("로그인 완료");

        draft.logInLodading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;

      case LOG_IN_FAILURE:
        draft.logInLodading = false;
        draft.logInError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;

      case CHANGE_NICKNAME_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;

      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;

      case LOAD_FOLLOWERS_SUCCESS:
        draft.me.Followers = action.data;
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        break;

      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;

      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;

      case LOAD_FOLLOWINGS_SUCCESS:
        draft.me.Followings = action.data;
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        break;

      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      /* return {
          ...state,
          me: { ...state.me, Posts: [{ id: action.data }, ...state.me.Posts] },
        }; */
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      /* return {
          ...state,
          me: {
            ...state.me,
            Posts: state.me.Posts.filter((v) => v.id !== action.data),
          },
        }; */
      default:
        return state;
    }
  });
};

export default reducer;
