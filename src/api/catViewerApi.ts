import axios from "axios";
import { GetImagesParams } from "../components/CatViewer/catViewer.types";

export const getImages = ({ page, limit = 30 }: GetImagesParams) => {
  const reqParams = new URLSearchParams();

  reqParams.append("api_key", process.env.REACT_APP_API_KEY || "");
  reqParams.append("limit", limit.toString());
  reqParams.append("page", page.toString());
  //reqParams.append("size", "thumb");

  return axios({
    method: "get",
    url: `https://api.thecatapi.com/v1/images/search?${reqParams.toString()}`,
  });
};
