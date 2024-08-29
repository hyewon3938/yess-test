import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ImageItem from "./ImageItem";
import { ImageData } from "./catViewer.types";

const ImageList = () => {
  const [columns, setColumns] = useState<Array<ImageData[]>>([[], [], []]);

  useEffect(() => {
    getImages();
  }, []);

  const distributeImages = (newImages: ImageData[]) => {
    const updatedColumns = [...columns];

    newImages.forEach((image, index) => {
      image.order = index; // 순서대로 이미지가 나오는지 확인하는 용
      updatedColumns[index % 3].push(image);
    });

    setColumns(updatedColumns);
  };

  const getImages = async () => {
    const res = await axios({
      method: "get",
      url: "https://api.thecatapi.com/v1/images/search?limit=10",
    });

    if (res?.data?.length) {
      distributeImages(res.data);
    }
  };

  return (
    <Wrap>
      {columns.map((column, colIndex) => (
        <Column key={colIndex}>
          {column.map((item, index) => (
            <ImageItem
              key={item?.id}
              colOrder={colIndex}
              order={index}
              data={item}
            />
          ))}
        </Column>
      ))}
    </Wrap>
  );
};

export default ImageList;

const Wrap = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 8px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;
