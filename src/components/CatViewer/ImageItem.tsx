import React from "react";
import styled from "styled-components";

import { ImageData } from "./catViewer.types";

interface ImageDataProps {
  order: number;
  colOrder: number;
  data: ImageData;
}

const ImageItem: React.FC<ImageDataProps> = ({ order, colOrder, data }) => {
  return (
    <Wrap>
      <span>{colOrder + " " + order + " " + data?.order}</span>
      <img src={data.url} />
    </Wrap>
  );
};

export default ImageItem;

const Wrap = styled.li`
  position: relative;
  margin-bottom: 16px;
  img {
    width: 100%;
    display: block;
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
