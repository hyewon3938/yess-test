import React, { useState } from "react";
import styled from "styled-components";

import { ImageData } from "../CatViewer/catViewer.types";

interface ImageDataProps {
  order: number;
  colOrder: number;
  data: ImageData;
}

interface WrapProps {
  expectedHeight?: number | undefined;
  isImageLoaded?: boolean;
}

const MasonryImageItem: React.FC<ImageDataProps & WrapProps> = ({
  order,
  colOrder,
  data,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onLoadImage = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <SkeletonWrap
        expectedHeight={data?.expectedHeight}
        isImageLoaded={isLoaded}
      />
      <Wrap isImageLoaded={isLoaded}>
        <img
          src={data.url}
          alt={`cat-image-${data?.id}`}
          onLoad={onLoadImage}
        />
        {isLoaded && <span>{colOrder + " " + order + " " + data?.order}</span>}
      </Wrap>
    </>
  );
};

export default MasonryImageItem;

const SkeletonWrap = styled.div<WrapProps>`
  display: ${({ isImageLoaded }) => (isImageLoaded ? "none" : "block")};
  width: 100%;
  height: ${({ expectedHeight }) => expectedHeight}px;
  background-color: #ededed;
`;

const Wrap = styled.li<WrapProps>`
  position: relative;
  margin-bottom: 16px;
  img {
    width: 100%;
    display: ${({ isImageLoaded }) => (isImageLoaded ? "block" : "none")};
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
