import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ImageData, GetImagesParams } from "./catViewer.types";
import { getCatImages } from "../../api/catViewerApi";
import MasonryImageView from "../common/MasonryImageView/MasonryImageView";
import useMasonryLayout from "../common/MasonryImageView/useMasonryLayout";
import LoadingIndicator from "../common/LoadingIndicator";
import useIntersect from "../../hooks/useIntersect";

const CatImages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const [images, setImages] = useState<ImageData[]>([]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const { columns, distributeImages } = useMasonryLayout(wrapRef);

  useEffect(() => {
    getDataHandler({ page: 0, limit: 15 });
  }, []);

  useEffect(() => {
    distributeImages(images);
  }, [images, distributeImages]);

  const getDataHandler = async ({ page, limit }: GetImagesParams) => {
    if (loading) return;
    if (currentPage === page) return;

    setLoading(true);

    const res = await getCatImages({ page: page, limit: limit });

    setLoading(false);
    setCurrentPage(page);

    if (res?.data?.length) {
      setImages((prev) => [...prev, ...res.data]);
    }
  };

  const onIntersectHandler = () => {
    getDataHandler({ page: currentPage + 1 });
  };

  const observerRef = useIntersect(onIntersectHandler);

  return (
    <Wrap ref={wrapRef}>
      <MasonryImageView columns={columns} />
      <Observer ref={observerRef}>
        <LoadingIndicator />
      </Observer>
    </Wrap>
  );
};

export default CatImages;

const Wrap = styled.div``;

const Observer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px;
`;
