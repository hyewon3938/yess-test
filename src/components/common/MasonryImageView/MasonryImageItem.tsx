import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

import { ImageData } from "../../CatViewer/catViewer.types";

interface ImageDataProps {
  order: number;
  colOrder: number;
  data: ImageData;
  setCurrentImage: (data: ImageData | null) => void;
  currentImage: ImageData | null;
}

interface WrapProps {
  $expectedHeight?: number | undefined;
  $isImageLoaded?: boolean;
  $isDetailMode?: boolean;
}

const MasonryImageItem: React.FC<ImageDataProps & WrapProps> = ({
  order,
  colOrder,
  data,
  setCurrentImage,
  currentImage,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onLoadImage = () => {
    setIsLoaded(true);
  };

  const onClickImageHandler = () => {
    console.log(imgRef.current?.getBoundingClientRect().top);
    setCurrentImage && setCurrentImage(data);
  };

  const closeImageDetail = () => {
    setCurrentImage && setCurrentImage(null);
  };

  return (
    <>
      <SkeletonWrap
        $expectedHeight={data?.expectedHeight}
        $isImageLoaded={isLoaded}
      />
      <Wrap
        $isImageLoaded={isLoaded}
        $isDetailMode={data.url === currentImage?.url}
      >
        <img
          ref={imgRef}
          src={data.url}
          alt={`cat-${data?.id}`}
          onLoad={onLoadImage}
          onClick={onClickImageHandler}
        />
        <ImageForDetail
          onClick={closeImageDetail}
          $isDetailMode={data.url === currentImage?.url}
        >
          <img src={data.url} alt={`cat-detail-${data?.id}`} />
        </ImageForDetail>
        {isLoaded && <span>{colOrder + " " + order + " " + data?.order}</span>}
      </Wrap>
    </>
  );
};

export default MasonryImageItem;

// const scaleUp = keyframes`
//   from {
//    //transform: translateX(0);
//    width : 100%;
//    height: 100%;
//   }
//   20% {
//     width : 100vw;
//     height : 100vh;
//     /* position : fixed;
//     top :0;
//     left:0; */
//   }
//   to {
//     /* position : fixed; */

//    transform: translate(50%,50%);
//     //width : 100vw;
//     /* top :0;
//     left:0;
//     width : 100vw;
//     height : 100vh; */
//   }
// `;
const SkeletonWrap = styled.div<WrapProps>`
  display: ${({ $isImageLoaded }) => ($isImageLoaded ? "none" : "block")};
  width: 100%;
  height: ${({ $expectedHeight }) =>
    $expectedHeight ? `${$expectedHeight}px` : "200px"};
  background-color: #ededed;
`;

const Wrap = styled.li<WrapProps>`
  position: relative;
  margin-bottom: 16px;
  width: 100%;

  img {
    width: 100%;
    display: ${({ $isImageLoaded }) => ($isImageLoaded ? "block" : "none")};
    transition: opacity 0.3s ease-in-out;
  }

  > span {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 30px;
    color: #fff;
    font-weight: 500;
  }
`;

const ImageForDetail = styled.div<WrapProps>`
  display: ${({ $isDetailMode }) => ($isDetailMode ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);

  > img {
    object-fit: contain;
    height: 100%;
  }
`;
