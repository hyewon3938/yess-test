export type ImageData = {
  id: string;
  url: string;
  order?: number;
  width: number;
  height: number;
  expectedHeight?: number;
};

export interface GetImagesParams {
  page: number;
  limit?: number;
}
