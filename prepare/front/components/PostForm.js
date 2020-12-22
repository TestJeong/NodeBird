import React, { useRef, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
} from "../reducers/post";
import styles from "../styles/postform.module.scss";

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput("");
  const dispatch = useDispatch();
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요");
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append("image", p);
    });
    formData.append("content", text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);
  //

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    console.log("postimage", imageFormData);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <Form
      className={styles.form}
      encType="multipart/form-data" //업로드할 파일이있는 양식에서 사용
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={1000}
        placeholder="어떤 일이 있었나요?"
      />

      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button
          icon={<CameraOutlined />}
          shape="round"
          onClick={onClickImageUpload}
          style={{ marginTop: "15px" }}
        />
        <Button
          type="primary"
          style={{ float: "right", marginTop: "15px" }}
          htmlType="submit"
        >
          SEND
        </Button>
      </div>

      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />

            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;

//맵 안에 데이터를 넣기 위해서는 고차함수 사용
