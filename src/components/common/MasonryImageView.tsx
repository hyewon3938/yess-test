import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ImageData } from "../CatViewer/catViewer.types";
import MasonryImageItem from "./MasonryImageItem";
import useIntersect from "../../hooks/useIntersect";
import useMasonryLayout from "../../hooks/useMasonryLayout";
import { GetImagesParams } from "../CatViewer/catViewer.types";

type GetDataFunction = ({
  page,
  limit,
}: GetImagesParams) => Promise<{ data: ImageData[] }>;

interface MasonryImageViewProps {
  list?: ImageData[];
  getData?: GetDataFunction;
}

const MasonryImageView: React.FC<MasonryImageViewProps> = ({
  list,
  getData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(-1);

  const { columns, columnRef, addImages } = useMasonryLayout(3);

  useEffect(() => {
    if (getData) return;
    list && addImages(list); // list만으로도 렌더링이 가능하도록 로직 추가
  }, [list]);

  useEffect(() => {
    getData && getDataHandler({ page: 0, limit: 15 });
  }, []);

  const getDataHandler = async ({ page, limit }: GetImagesParams) => {
    if (loading) return;
    if (currentPage === page) return;
    if (!getData) return;

    setLoading(true);

    const res = await getData({ page: page, limit: limit });

    setLoading(false);
    setCurrentPage(page);

    if (res?.data?.length) {
      addImages(res.data);
    }
  };

  const onIntersectHandler = () => {
    getDataHandler({ page: currentPage + 1 });
  };

  const observerRef = useIntersect(onIntersectHandler);

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
  padding: 16px;
  border: solid 1px red;
`;
