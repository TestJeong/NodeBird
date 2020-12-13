import React, { useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Form, Card, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  CHANGE_AVATAR_IMAGE_REQUEST,
  UPLOAD_AVATAR_IMAGE_REQUEST,
} from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/avatarimg.module.scss";

const CardContainer = styled(Form)`
  width: 90%;
  border-radius: 10px;
  margin: 0 auto 30px auto;
  background-color: white;
  border: 1px solid #f0f0f0;
`;

const AvatarImage = () => {
  const dispatch = useDispatch();

  const {
    avatarImage,
    changeAvatarImageDone,
    changeAvatarUploadDone,
    me,
  } = useSelector((state) => state.user);

  const onChangeAvatar = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("avatar", f);
    });

    console.log("프로필 이미지 테스트", imageFormData);
    dispatch({
      type: UPLOAD_AVATAR_IMAGE_REQUEST,
      data: imageFormData,
    });
  });

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    avatarImage.forEach((p) => {
      formData.append("avatar", p);
    });

    console.log("formData_profile", formData);

    return dispatch({
      type: CHANGE_AVATAR_IMAGE_REQUEST,
      data: formData,
    });
  }, [avatarImage]);

  useEffect(() => {
    if (changeAvatarImageDone) {
      window.location.reload(false);
    }
  });

  return (
    <Form encType="multipart/form-data" onFinish={onSubmit}>
      <CardContainer title={"프로필 이미지 변경"}>
        <div class={styles.container}>
          <div class={styles.avatarupload}>
            <div class={styles.avataredit}>
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
            <div class={styles.avatarpreview}>
              <img
                src={`http://localhost:3065/avatar/${
                  changeAvatarUploadDone ? avatarImage[0] : me.avatar
                }`}
              />
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button type="primary" htmlType="submit">
            변경
          </Button>
        </div>
      </CardContainer>
    </Form>
  );
};

export default AvatarImage;
