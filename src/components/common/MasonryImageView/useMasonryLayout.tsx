import { useEffect, useMemo, useState, useCallback, RefObject } from "react";
import { ImageData } from "../../CatViewer/catViewer.types";
import { device } from "../../../styles/breakpoints";
import debounce from "lodash/debounce";

const useMasonryLayout = (wrapRef: RefObject<HTMLDivElement>) => {
  const [columns, setColumns] = useState<Array<ImageData[]>>([]);
  const [columnCount, setColumnCount] = useState<number>(3);

  const calculateColumnCount = useCallback(() => {
    if (window.innerWidth >= device.mobile) return 3;
    if (window.innerWidth >= device.small) return 2;
    return 1;
  }, []);

  const handleResize = useCallback(() => {
    const newColumnCount = calculateColumnCount();
    if (newColumnCount !== columnCount) {
      setColumnCount(newColumnCount);
    }
  }, [calculateColumnCount, columnCount]);

  const debouncedHandleResize = useMemo(
    () => debounce(handleResize, 100),
    [handleResize]
  );

  useEffect(() => {
    handleResize(); // 초기 렌더링 시 column 개수 설정
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [debouncedHandleResize, handleResize]);

  const calculateExpectedHeight = useCallback(
    (columnWidth: number, originalWidth: number, originalHeight: number) => {
      const scaleFactor: number = columnWidth / originalWidth;
      // 데이터가 없을 경우를 대비해 임의로 column의 너비 값을 넣어줌
      return originalHeight * scaleFactor || columnWidth;
    },
    []
  );

  // 이미지를 컬럼에 분배하는 함수
  const distributeImages = useCallback(
    (images: ImageData[]) => {
      if (!wrapRef?.current) return;

      const updatedColumns = Array.from(
        { length: columnCount },
        () => [] as ImageData[]
      );
      const columnHeights = Array(columnCount).fill(0);
      const columnWidth: number =
        (wrapRef.current?.offsetWidth - (columnCount - 1 * 16)) / 3;

      images.forEach((image, index) => {
        const shortestColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights)
        );

        const expectedHeight = calculateExpectedHeight(
          columnWidth,
          image.width,
          image.height
        );

        updatedColumns[shortestColumnIndex].push({
          ...image,
          order: index,
          expectedHeight: expectedHeight,
        });

        columnHeights[shortestColumnIndex] += expectedHeight;
      });

      setColumns(updatedColumns);
    },
    [calculateExpectedHeight, wrapRef, columnCount]
  );

  return { columns, distributeImages };
};

export default useMasonryLayout;
