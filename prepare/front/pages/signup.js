import React, { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { END } from "redux-saga";
import { EditOutlined } from "@ant-design/icons";
import styles from "../styles/signup.module.scss";
import avatarimg from "../styles/avatarimg.module.scss";

import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  SIGN_UP_REQUEST,
  LOAD_MY_INFO_REQUEST,
  UPLOAD_AVATAR_IMAGE_REQUEST,
} from "../reducers/user";
import wrapper from "../store/configureStore";
import {
  faCameraRetro,
  faCommentAlt,
  faMousePointer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Noimg from "../img/noimg.png";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const {
    signUploading,
    signUpDone,
    signUpError,
    me,
    avatarImage,
    changeAvatarUploadDone,
  } = useSelector((state) => state.user);
  // replace는 뒤로가기 눌렀을때 나오지 않음
  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordcheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordcheck(e.target.value);
      setPasswordError(e.target.value !== password); //입력한 값과 password 값이 같지 않다면 true이므로 passwordError 가 false에서 true로 변경된다
    },
    [password]
  );

  const [term, setTerm] = useState(""); //체크박스 선택여부 확인.
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onChangeAvatar = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("avatar", f);
    });

    console.log("회원가입", imageFormData);

    dispatch({
      type: UPLOAD_AVATAR_IMAGE_REQUEST,
      data: imageFormData,
    });
  });

  const onSubmit = useCallback(
    (e) => {
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      const formData = new FormData();
      avatarImage.forEach((p) => {
        formData.append("avatar", p);
      });
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname, avatar: avatarImage },
      });
    },
    [password, passwordCheck, term, avatarImage]
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | NodeBird</title>
      </Head>

      <div className={styles.main_container}>
        <div className={styles.left_section}>
          <div className={styles.left_msg}>
            <ul>
              <li>
                <FontAwesomeIcon icon={faMousePointer} />
                <span>반가워요.</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCameraRetro} />
                <span>당신의 일상이 궁금해요!</span>{" "}
              </li>
              <li>
                <FontAwesomeIcon icon={faCommentAlt} />
                <span>함께 일상을 공유해봐요</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.right_section}>
          <div className={styles.form_container}>
            <Form onFinish={onSubmit}>
              <div className={styles.avatar}>
                <label htmlFor="user-avatar">프로필 사진</label>
                <br />

                <div>
                  <div class={avatarimg.container}>
                    <div class={avatarimg.avatarupload}>
                      <div class={avatarimg.avataredit}>
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                          name="avatar"
                          onChange={onChangeAvatar}
                        />
                        <label for="imageUpload">
                          <EditOutlined />
                        </label>
                      </div>
                      <div class={avatarimg.avatarpreview}>
                        <img
                          src={
                            changeAvatarUploadDone
                              ? `http://localhost:3065/avatar/${avatarImage[0]}`
                              : Noimg
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={(styles.email, styles.rowbutton)}>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input
                  name="user-email"
                  type="email"
                  value={email}
                  required
                  onChange={onChangeEmail}
                />
              </div>

              <div className={(styles.nickname, styles.rowbutton)}>
                <label htmlFor="user-nickname">닉네임</label>
                <br />
                <Input
                  name="user-nickname"
                  value={nickname}
                  required
                  onChange={onChangeNickname}
                />
              </div>
              <div className={(styles.password, styles.rowbutton)}>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                  name="user-password"
                  type="password"
                  value={password}
                  required
                  onChange={onChangePassword}
                />
              </div>
              <div className={(styles.passwordcheck, styles.rowbutton)}>
                <label htmlFor="user-password">비밀번호 체크</label>
                <br />
                <Input
                  name="user-password"
                  type="password"
                  value={passwordCheck}
                  required
                  onChange={onChangePasswordCheck}
                />
                {passwordError && (
                  <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                )}
              </div>

              <div className={(styles.checkbox, styles.rowbutton)}>
                <Checkbox
                  name="user-term"
                  checked={term}
                  onChange={onChangeTerm}
                >
                  모든 것을 확인하고 동의합니다.
                </Checkbox>
                {termError && (
                  <ErrorMessage style={{ color: "red" }}>
                    약관에 동의하지 않으시면 가입이 불가합니다.
                  </ErrorMessage>
                )}
              </div>
              <div className={styles.submit_button} style={{ marginTop: 10 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={signUploading}
                >
                  제출
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("context => ", context);
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Signup;

// checkbox 에서 check 의 기본값은 false..
