import React, {useMemo, useCallback, useEffect} from "react";
import {Form, Card, Button } from "antd";
import { CHANGE_AVATAR_IMAGE_REQUEST, UPLOAD_AVATAR_IMAGE_REQUEST } from "../reducers/user";
import {useDispatch, useSelector} from 'react-redux'
import styles from "../styles/styles.module.scss"



const AvatarImage = () => {

  const dispatch = useDispatch()

  const {avatarImage, changeAvatarImageDone} = useSelector((state) => state.user);

  useEffect(() => {
    if(changeAvatarImageDone) {
      console.log("chagne avatar done")
    
    }

  },[changeAvatarImageDone])

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
          {avatarImage ? <img
            src={`http://localhost:3065/avatar/${avatarImage[0]}`}
          /> : null}
        </div>
      </div>
    </div>
      
      <Button type="primary" htmlType="submit">변경</Button>
      
      
      </Card>
    </Form>
  )
}

export default AvatarImage;