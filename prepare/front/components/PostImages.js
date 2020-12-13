import React, { useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "../components/ImagesZoom";
import styled from "styled-components";

const Contianer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Plusimg = styled.div`
  width: 50%;
  height: auto;
  background-color: #e7e7e7;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const ImageP = styled.img`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 50%;
  margin: 20px auto 20px auto;
`;

const PostImages = ({ images }) => {
  const style = useMemo(() => ({
    borderRadius: "20px",
    width: "50%",
    margin: "0 auto",
    padding: "10px",
  }));

  const [showImagesZoom, setShowImagesZoome] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoome(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoome(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <ImageP
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <Contianer>
          <ImageP
            style={style}
            role="presentation"
            width="50%"
            src={`http://localhost:3065/${images[0].src}`}
            alt={images[0].src}
            onClick={onZoom}
          />
          <ImageP
            style={style}
            role="presentation"
            width="50%"
            src={`http://localhost:3065/${images[1].src}`}
            alt={images[1].src}
            onClick={onZoom}
          />
          {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </Contianer>
      </>
    );
  }
  return (
    <>
      <Contianer>
        <ImageP
          style={style}
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />

        <Plusimg role="presentation" onClick={onZoom}>
          <PlusOutlined />
          {images.length - 1}
          개의 사진 더보기
        </Plusimg>
      </Contianer>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
