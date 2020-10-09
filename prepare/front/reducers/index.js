import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

// (이전상태, 액션) => 다음상태를 만들어냄
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HADRATE", action); // getServerSideProps가 실행되어 결과값을 HYDRATE에 보내준다
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
    }
  }
};
// 서버사이드렌더링을 위해 HYDRATE를 추가하기 위해 switch문을 사용해 리듀서를 추가한다

export default rootReducer;
