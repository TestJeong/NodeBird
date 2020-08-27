import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

// (이전상태, 액션) => 다음상태를 만들어냄
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  }, // 서버사이드렌더링을 위해 HYDRATE를 추가하기 위해 switch문을 사용해 리듀서를 추가한다
  user,
  post,
});

export default rootReducer;
