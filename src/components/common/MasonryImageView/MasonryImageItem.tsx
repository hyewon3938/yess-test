import React, { useState, useRef } from "react";
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
  $isClosing?: boolean;
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
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const onLoadImage = () => {
    setIsLoaded(true);
  };

  const onClickImageHandler = () => {
    if (!detailImgRef?.current || !imgRef?.current) return;

    //이동 방향 계산
    const centerX = window.innerWidth / 2;
    const centerY = window.scrollY + window.innerHeight / 2;

    const imgRect = imgRef.current?.getBoundingClientRect();

    const imgCenterX = imgRect.left + imgRect.width / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2 + window.scrollY;

    const translateX = centerX - imgCenterX;
    const translateY = centerY - imgCenterY;

    // 얼만큼 확대할지 계산
    const newHeight = window.innerHeight;
    const newWidth = window.innerWidth;

    const heightScaleFactor = newHeight / imgRect.height;
    const widthScaleFactor = newWidth / imgRect.width;

    const scaleFactor = Math.min(heightScaleFactor, widthScaleFactor);

    setPositionData({ x: translateX, y: translateY, scaleFactor });
    setCurrentImage && setCurrentImage(data);
    document.body.style.overflow = "hidden";
  };

  const closeImageDetail = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setPositionData(null);
      setCurrentImage && setCurrentImage(null);
      document.body.style.overflow = "unset";
    }, 300); // 애니메이션 시간과 동일하게 설정
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
        {data.url === currentImage?.url && (
          <ImageDetailBackground onClick={closeImageDetail} />
        )}
        <ImageForDetail
          ref={detailImgRef}
          onClick={closeImageDetail}
          $isDetailMode={data.url === currentImage?.url}
          $x={positionData?.x}
          $y={positionData?.y}
          $scaleFactor={positionData?.scaleFactor}
          $isClosing={isClosing}
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
  }
  to {
    transform: translate(${x}px, ${y}px) scale(${scaleFactor});
  }
`;

const scaleDown = (
  x?: number | null,
  y?: number | null,
  scaleFactor?: number | null
) => keyframes`
  from {
    transform: translate(${x}px, ${y}px) scale(${scaleFactor});
  }
  to {
    transform: translate(0, 0) scale(1);
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

  animation: ${({ $x, $y, $scaleFactor, $isClosing }) =>
      $isClosing
        ? scaleDown($x, $y, $scaleFactor)
        : scaleUp($x, $y, $scaleFactor)}
    0.3s forwards;

  > img {
    object-fit: contain;
    height: 100%;
    z-index: 1000;
  }
`;

const ImageDetailBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: rgba(255, 255, 255, 0.8);
`;
