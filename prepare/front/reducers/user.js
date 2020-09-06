export const init = {
  isLoggedIn: false,
  isLoggingIn: false, //로그인 시도중
  isLoggingOut: false, // 로그아웃 시도중 (ture이면 로딩창을 뛰우는 것)
  me: null, // 로그인한 id와 paw가 저장
  signUpdata: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data, // data : data 이므로 LoginForm에서 dispatch로 전달받은loginAction의 인자값이 data이다
  };
};

export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("reducer run");
      return {
        ...state,
        isLoggingIn: true,
      };

    case "LOG_IN_SUCCESS":
      console.log("로그인 완료");
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "yun" },
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };

    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: action.data,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
