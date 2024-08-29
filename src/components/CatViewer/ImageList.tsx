import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ImageItem from "./ImageItem";
import { ImageData } from "./catViewer.types";

const ImageList = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [columns, setColumns] = useState<Array<ImageData[]>>([[], [], []]);

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (images.length) {
      distributeImages(images, 3);
    }
  }, [images]);

  const distributeImages = (images: ImageData[], numColumns: number) => {
    const newColumns: Array<ImageData[]> = Array.from(
      { length: numColumns },
      () => []
    );

    images.forEach((image, index) => {
      image.order = index; // 순서대로 이미지가 나오는지 확인하는 용
      newColumns[index % numColumns].push(image);
    });

    setColumns(newColumns);
  };

  const getImages = async () => {
    const res = await axios({
      method: "get",
      url: "https://api.thecatapi.com/v1/images/search?limit=10",
    });

    setImages((prev) => [...prev, ...res.data]);
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
