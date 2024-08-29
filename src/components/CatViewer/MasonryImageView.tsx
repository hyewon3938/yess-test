import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImageData } from "./catViewer.types";
import MasonryImageItem from "./MasonryImageItem";

type GetDataFunction = () => Promise<{ data: ImageData[] }>;

interface MasonryImageViewProps {
  list?: ImageData[];
  getData?: GetDataFunction;
}

const MasonryImageView: React.FC<MasonryImageViewProps> = ({
  list,
  getData,
}) => {
  const [columns, setColumns] = useState<Array<ImageData[]>>([[], [], []]);

  useEffect(() => {
    if (getData) return;
    list && distributeImages(list); // list만으로도 렌더링이 가능하도록 로직 추가
  }, [list]);

  useEffect(() => {
    getData && getImages();
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
    if (!getData) return;
    const res = await getData();

    if (res?.data?.length) {
      distributeImages(res?.data);
    }
  };

  const onClickMore = () => {
    getImages();
  };

  return (
    <>
      <Wrap>
        {columns.map((column, colIndex) => (
          <Column key={colIndex}>
            {column.map((item, index) => (
              <MasonryImageItem
                key={item?.id}
                colOrder={colIndex}
                order={index}
                data={item}
              />
            ))}
          </Column>
        ))}
      </Wrap>
      <button onClick={onClickMore}>더보기</button>
    </>
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
