import React, {useMemo, useRef, useCallback, useState} from "react";
import {Form, Card, Button } from "antd";
import { CHANGE_AVATAR_IMAGE_REQUEST, UPLOAD_AVATAR_IMAGE_REQUEST } from "../reducers/user";
import {useDispatch, useSelector} from 'react-redux'


const AvatarImage = () => {
  const [imageAvatar, setImageAvatar] = useState(null)
  const dispatch = useDispatch()

  const {avatarImage} = useSelector((state) => state.user);
  
  const userAvatarImage = useRef()

  const onUploadAvatar = useCallback(
    () => {
      userAvatarImage.current.click()
    },
    [userAvatarImage.current],
  )
  
  const onChangeAvatar = useCallback((e) => {

    console.log("hook",imageAvatar)
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
      <input 
        type="file"
        name="avatar"
        multiple
        hidden
        ref={userAvatarImage}
        onChange={onChangeAvatar}
        value={imageAvatar}       
      />
      <Button onClick={onUploadAvatar}>업로드</Button>
      <Button type="primary" htmlType="submit">변경</Button>
      <div>
        {avatarImage.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />

            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
      
      </Card>
    </Form>
  )
}

export default AvatarImage;