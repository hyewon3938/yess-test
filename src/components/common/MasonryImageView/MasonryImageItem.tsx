import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

import { ImageData } from "../../CatViewer/catViewer.types";

interface ImageDataProps {
  data: ImageData;
  setCurrentImage: (data: ImageData | null) => void;
  currentImage: ImageData | null;
}

interface WrapProps {
  $expectedHeight?: number | undefined;
  $isImageLoaded?: boolean;
  $isDetailMode?: boolean;
  $x?: number | null;
  $y?: number | null;
  $scaleFactor?: number | null;
}

const MasonryImageItem: React.FC<ImageDataProps & WrapProps> = ({
  data,
  setCurrentImage,
  currentImage,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const detailImgRef = useRef<HTMLImageElement>(null);

  const [positionData, setPositionData] = useState<{
    x: number;
    y: number;
    scaleFactor: number;
  } | null>(null);

  const onLoadImage = () => {
    setIsLoaded(true);
  };

  const onClickImageHandler = () => {
    if (!detailImgRef?.current || !imgRef?.current) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.scrollY + window.innerHeight / 2;

    const imgRect = imgRef.current?.getBoundingClientRect();

    const imgCenterX = imgRect.left + imgRect.width / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2 + window.scrollY;

    const translateX = centerX - imgCenterX;
    const translateY = centerY - imgCenterY;

    const newHeight = window.scrollY + window.innerHeight;
    const newWidth = window.innerWidth;

    const heightScaleFactor = newHeight / imgRect.height;
    const widthScaleFactor = newWidth / imgRect.width;

    const scaleFactor = Math.min(heightScaleFactor, widthScaleFactor);

    console.log(translateX, translateY, scaleFactor);

    setPositionData({ x: translateX, y: translateY, scaleFactor });
    setCurrentImage && setCurrentImage(data);
  };

  const closeImageDetail = () => {
    setPositionData(null);
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
          ref={detailImgRef}
          onClick={closeImageDetail}
          $isDetailMode={data.url === currentImage?.url}
          $x={positionData?.x}
          $y={positionData?.y}
          $scaleFactor={positionData?.scaleFactor}
        >
          <img src={data.url} alt={`cat-detail-${data?.id}`} />
        </ImageForDetail>
      </Wrap>
    </>
  );
};

export default MasonryImageItem;

const scaleUp = (
  x?: number | null,
  y?: number | null,
  scaleFactor?: number | null
) => keyframes`
  from {
    transform: translate(0, 0) scale(1);
    opacity: 0; 
  }
  to {
    transform: translate(${x}px, ${y}px) scale(${scaleFactor});
    opacity: 1; 
  }
`;

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

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  animation: ${({ $x, $y, $scaleFactor }) => scaleUp($x, $y, $scaleFactor)} 0.5s
    forwards;

  > img {
    object-fit: contain;
    height: 100%;
  }
`;
