import { HYDRATE } from "next-redux-wrapper";

const init = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = (data) => {
  return {
    type: "LOG_OUT",
  };
};

const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};

changeNickname("boogicho");

store.dispatch(changeNickname("mighty tak"));

// (이전상태, 액션) => 다음상태를 만들어냄
const rootReducer = (state = init, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return { ...state, ...action.payload };
    case "LOG_IN":
      return {
        ...state,
        user: { ...state.user, isLoggedIn: true, user: action.data },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: { ...state.user, isLoggedIn: false, user: null },
      };
    default:
      return state;
  }
};

export default rootReducer;
