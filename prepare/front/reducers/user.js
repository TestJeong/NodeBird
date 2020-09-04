export const init = {
  isLoggedIn: false,
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

export const loginSuccessAction = () => {
  return {
    type: "LOG_IN_SUCCESS",
  };
};

export const loginFailureAction = () => {
  return {
    type: "LOG_IN_FAILURE",
  };
};

export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST",
  };
};

export const logoutSuccessAction = () => {
  return {
    type: "LOG_OUT_SUCCESS",
  };
};

export const logoutFailureAction = () => {
  return {
    type: "LOG_OUT_FAILURE",
  };
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
