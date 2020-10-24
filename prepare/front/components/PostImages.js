import React, { useCallback, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "../components/ImagesZoom";
import styled from 'styled-components'

const Contianer = styled.div`
display: flex;
width: 100%;
height: 100%;
`

const Plusimg = styled.div `
  width: 50%;
  height: auto;
  background-color: gainsboro;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`

const PostImages = ({ images }) => {

  const style = useMemo(() => ({
    borderRadius: "20px",
    width: "50%",
    margin: "0 auto",
    padding: "10px"

  }))
  
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
        <img
          style={style}
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
        <img
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${images[1].src}`}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <Contianer>
        <img
          style={style}
          role="presentation"
          width="50%"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        
          <Plusimg
            role="presentation"
            onClick={onZoom}
          >
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
