import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ImageData, GetImagesParams } from "./catViewer.types";
import { getCatImages } from "../../api/catViewerApi";
import MasonryImageView from "../common/MasonryImageView/MasonryImageView";
import useMasonryLayout from "../common/MasonryImageView/useMasonryLayout";
import LoadingIndicator from "../common/LoadingIndicator";
import useIntersect from "../../hooks/useIntersect";
import { AxiosError } from "axios";

const CatImages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    status?: number;
    code?: string;
  } | null>(null);
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
    try {
      if (loading) return;
      if (currentPage === page) return;

      setLoading(true);

      const res = await getCatImages({ page: page, limit: limit });

      setLoading(false);
      setCurrentPage(page);
      setIsError(null);

      if (res?.data?.length) {
        setImages((prev) => [...prev, ...res.data]);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      setLoading(false);
      setIsError({ status: axiosError?.status, code: axiosError?.code });
    }
  };

  const onIntersectHandler = () => {
    getDataHandler({ page: currentPage + 1 });
  };

  const observerRef = useIntersect(onIntersectHandler);

  return (
    <Wrap ref={wrapRef}>
      <MasonryImageView columns={columns} />

      {isError ? (
        <ErrorMessage>
          <p>
            이미지를 불러오던 중 오류가 발생했습니다.
            <br />
            {isError?.status} : {isError?.code}
          </p>
          <button onClick={onIntersectHandler}>재시도</button>
        </ErrorMessage>
      ) : (
        <Observer ref={observerRef}>
          <LoadingIndicator />
        </Observer>
      )}
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

const ErrorMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 80px 0;
  > p {
    line-height: 1.8;
    text-align: center;
  }
  > button {
    color: #fff;
    background-color: #000;
    padding: 10px 24px;
    border-radius: 6px;
  }
`;
