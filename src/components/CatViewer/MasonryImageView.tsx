import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ImageData } from "./catViewer.types";
import MasonryImageItem from "./MasonryImageItem";
import useIntersect from "../../hooks/useIntersect";

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
  const [columnHeights, setColumnHeights] = useState<number[]>([0, 0, 0]);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getData) return;
    list && distributeImages(list); // list만으로도 렌더링이 가능하도록 로직 추가
  }, [list]);

  useEffect(() => {
    getData && getDataHandler();
  }, []);

  const distributeImages = (newImages: ImageData[]) => {
    const updatedColumns = [...columns];
    const updatedColumnHeights = [...columnHeights];

    newImages.forEach((image, index) => {
      image.order = index; // 순서대로 이미지가 나오는지 확인하는 용
      const minHeightIndex = updatedColumnHeights.indexOf(
        Math.min(...updatedColumnHeights)
      );

      updatedColumns[minHeightIndex] = [
        ...updatedColumns[minHeightIndex],
        image,
      ];

      updatedColumnHeights[minHeightIndex] += calculateExpectedHeight(
        image.width,
        image.height
      );
    });

    setColumns(updatedColumns);
    setColumnHeights(updatedColumnHeights);
  };

  const calculateExpectedHeight = (
    originalWidth: number,
    originalHeight: number
  ): number => {
    const columnWidth: number = columnRef.current?.offsetWidth || 0;
    const scaleFactor = columnWidth / originalWidth;
    const expectedHeight = originalHeight * scaleFactor;
    return expectedHeight;
  };

  const getDataHandler = async () => {
    if (!getData) return;
    const res = await getData();

    if (res?.data?.length) {
      distributeImages(res?.data);
    }
  };

  const onClickMore = () => {
    console.log("onIntersect");
    getDataHandler();
  };
  const observerRef = useIntersect(onClickMore);

  return (
    <>
      <Wrap>
        {columns.map((column, colIndex) => (
          <Column ref={columnRef} key={colIndex}>
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

      <Observer ref={observerRef} />
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

const Observer = styled.div`
  width: 100%;
  height: 50px;
`;
