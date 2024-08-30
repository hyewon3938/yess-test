import React, { useEffect } from "react";
import styled from "styled-components";
import { ImageData } from "./catViewer.types";
import MasonryImageItem from "./MasonryImageItem";
import useIntersect from "../../hooks/useIntersect";
import useMasonryLayout from "./useMasonryLayout";

type GetDataFunction = () => Promise<{ data: ImageData[] }>;

interface MasonryImageViewProps {
  list?: ImageData[];
  getData?: GetDataFunction;
}

const MasonryImageView: React.FC<MasonryImageViewProps> = ({
  list,
  getData,
}) => {
  const { columns, columnRef, addImages } = useMasonryLayout(3);

  useEffect(() => {
    if (getData) return;
    list && addImages(list); // list만으로도 렌더링이 가능하도록 로직 추가
  }, [list]);

  useEffect(() => {
    getData && getDataHandler();
  }, []);

  const getDataHandler = async () => {
    if (!getData) return;
    const res = await getData();

    if (res?.data?.length) {
      addImages(res.data);
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
                key={`image-${colIndex}-${index}-${item?.id}`}
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
