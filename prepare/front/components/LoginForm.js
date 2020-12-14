import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
  margin-top: 11px;
`;

const LoginButton = styled(Button)`
  margin-right: 15px;
`;

const FormWrapper = styled(Form)`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto 30px auto;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLodading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    // onFinsh는 자동적으로 e.prevent가 들어가있다(새로고침)
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <LoginButton type="primary" htmlType="submit" loading={logInLodading}>
          로그인
        </LoginButton>

        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
