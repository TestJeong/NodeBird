import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Card, Button } from "antd";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";

const FormContainer = styled(Form)`
  width: 90%;
  border-radius: 10px;
  margin: 0 auto 30px auto;
  background-color: white;
  padding: 20px;
  border: 1px solid #f0f0f0;
`;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <FormContainer>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </FormContainer>
  );
};

export default NicknameEditForm;
