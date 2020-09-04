import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
import withReduxSaga from "next-redux-saga";
import wrapper from "../store/configureStore";

//페이지에서 공통된 것을 처리

const NodeBird = ({ Component }) => {
  //// index.js , profile.js 등 페이지 컴포넌트의 리턴값들이 들어온다
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(NodeBird));

//pages들의 공통 부분
