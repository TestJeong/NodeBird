import React, {useMemo, useCallback, useEffect} from "react";
import {Form, Card, Button } from "antd";
import { CHANGE_AVATAR_IMAGE_REQUEST, UPLOAD_AVATAR_IMAGE_REQUEST } from "../reducers/user";
import {useDispatch, useSelector} from 'react-redux'
import styles from "../styles/avatarimg.module.scss"


const AvatarImage = () => {

  const dispatch = useDispatch()

  const {avatarImage, changeAvatarImageDone,changeAvatarUploadDone, me} = useSelector((state) => state.user);

  const onChangeAvatar = useCallback((e) => {

    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("avatar", f);
    });
    
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
    return dispatch({
      type: CHANGE_AVATAR_IMAGE_REQUEST,
      data: formData,
    });
  }, [avatarImage]);

  useEffect(() => {
    if(changeAvatarImageDone) {
      window.location.reload(false);
    }
  })

  const style = useMemo(() => ({
    marginBottom: "20px",
    border: "1px solid #d9d9d9",
  }));

  return (
    <Form
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Card title={"프로필 이미지 변경"} style={style}>
      <div class={styles.container}>
      <div class={styles.avatarupload}>
        <div class={styles.avataredit}>
          <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" name="avatar" onChange={onChangeAvatar} />
          <label for="imageUpload"></label>
        </div>
        <div class={styles.avatarpreview}>
          <img
            src={`http://localhost:3065/avatar/${changeAvatarUploadDone ? avatarImage[0] : me.avatar}`}
          />
        </div>
      </div>
    </div>
      
      <Button type="primary" htmlType="submit">변경</Button>
      
      
      </Card>
    </Form>
  )
}

export default AvatarImage;