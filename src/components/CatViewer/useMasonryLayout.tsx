import { useState, useRef, useCallback } from "react";
import { ImageData } from "./catViewer.types";

const useMasonryLayout = (columnCount: number = 3) => {
  const [columns, setColumns] = useState<Array<ImageData[]>>(
    Array(columnCount).fill([])
  );
  const [columnHeights, setColumnHeights] = useState<number[]>(
    Array(columnCount).fill(0)
  );
  const columnRef = useRef<HTMLDivElement>(null);

  const calculateExpectedHeight = useCallback(
    (originalWidth: number, originalHeight: number) => {
      const columnWidth: number = columnRef.current?.offsetWidth || 0;
      const scaleFactor: number = columnWidth / originalWidth;
      return originalHeight * scaleFactor;
    },
    []
  );

  const distributeImages = useCallback(
    (newImages: ImageData[]) => {
      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((column) => [...column]);
        const updatedColumnHeights = [...columnHeights];

        newImages.forEach((image, index) => {
          console.log("run");
          const newImage = { ...image, order: index };
          const minHeightIndex = updatedColumnHeights.indexOf(
            Math.min(...updatedColumnHeights)
          );

          updatedColumns[minHeightIndex].push(newImage);
          updatedColumnHeights[minHeightIndex] += calculateExpectedHeight(
            image.width,
            image.height
          );
        });

        setColumnHeights(updatedColumnHeights);
        return updatedColumns;
      });
    },
    [calculateExpectedHeight, columnHeights]
  );

  const addImages = useCallback(
    (newImages: ImageData[]) => {
      distributeImages(newImages);
    },
    [distributeImages]
  );

  return { columns, columnRef, addImages };
};

export default useMasonryLayout;
