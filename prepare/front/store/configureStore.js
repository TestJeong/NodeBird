import { createWrapper } from "next-redux-wrapper";
import { createStroe } from "redux";

import reducer from "../reducers";

const configureStore = () => {
  const store = createStroe(reducer);
  store.dispatch({ type: "CHANGE_NICKNAME", data: "boogicho" });
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
