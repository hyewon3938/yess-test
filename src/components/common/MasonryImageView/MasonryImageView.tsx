import React, { useState } from "react";
import styled from "styled-components";
import { ImageData } from "../../CatViewer/catViewer.types";
import MasonryImageItem from "./MasonryImageItem";

interface MasonryImageViewProps {
  columns: Array<ImageData[]>;
}

const MasonryImageView: React.FC<MasonryImageViewProps> = ({ columns }) => {
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);

  console.log(currentImage);

  return (
    <Wrap>
      {columns.map((column, colIndex) => (
        <Column key={colIndex}>
          {column.map((item, index) => (
            <MasonryImageItem
              key={`image-${colIndex}-${index}-${item?.id}`}
              colOrder={colIndex}
              order={index}
              data={item}
              setCurrentImage={setCurrentImage}
              currentImage={currentImage}
            />
          ))}
        </Column>
      ))}
    </Wrap>
  );
};

export default MasonryImageView;

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
