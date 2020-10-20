import React, {useMemo, useRef, useCallback} from "react";
import {Form, Card, Button } from "antd";
import { UPLOAD_AVATAR_IMAGE_REQUEST } from "../reducers/user";
import {useDispatch, useSelector} from 'react-redux'


const AvatarImage = () => {
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
    console.log("Avatar", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("avatar", f);
    });
    console.log(imageFormData)
    dispatch({
      type: UPLOAD_AVATAR_IMAGE_REQUEST,
      data: imageFormData,
    });
  });
  

  const style = useMemo(() => ({
    marginBottom: "20px",
    border: "1px solid #d9d9d9",
    
  }));

  return (
    <Form
      encType="multipart/form-data"
    >
      <Card title={"프로필 이미지 변경"} style={style}>
      <input 
        type="file"
        name="avatar"
        multiple
        hidden
        ref={userAvatarImage}
        onChange={onChangeAvatar}        
      />
      <Button onClick={onUploadAvatar}>업로드</Button>
      <Button>수정</Button>
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