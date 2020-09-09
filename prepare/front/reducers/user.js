export const init = {
  logInLodading: false, // 로그인 시도중
  logInDone: false,
  logInError: false,
  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUploading: false, // 로그아웃 시도중
  signUpDone: false,
  signUpError: null,
  me: null, // 로그인한 id와 paw가 저장
  signUpdata: {},
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const SAGA_TEST = "SAGA_TEST";

const dummyUser = (data) => ({
  ...action.data,
  nickname: "YUN",
  id: 1,
  Post: [],
  Followings: [],
  Followers: [],
});

export const sagaRequestAction = () => {
  type: SAGA_TEST;
};

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

const reducer = (state = init, action) => {
  switch (action.type) {
    case SAGA_TEST:
      console.log("테스트중입니다");

    case LOG_IN_REQUEST:
      console.log("reducer run");
      console.log("asdf");
      return {
        ...state,
        logInLodading: true,
        logInError: null,
        logInDone: false,
      };

    case LOG_IN_SUCCESS:
      console.log("로그인 완료");
      return {
        ...state,
        logInLodading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLodading: false,
        logInError: action.error,
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
