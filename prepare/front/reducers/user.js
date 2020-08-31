export const init = {
  isLoggedIn: false,
  me: null, // 로그인한 id와 paw가 저장
  signUpdata: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data, // data : data 이므로 LoginForm에서 dispatch로 전달받은loginAction의 인자값이 data이다
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "LOG_OUT":
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
