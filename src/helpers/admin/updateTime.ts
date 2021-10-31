import { FetchOptions } from "../../interface/FetchOptions";
import { SuccessFailResponse } from "../../interface/SuccessFailResponse";

const updateTime = async (request: UpdateTimeRequest): Promise<SuccessFailResponse> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/admin/setLibTime`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default updateTime;
  export interface UpdateTimeRequest{
      libraryID:string,
      startTime:string,
      endTime:string,
      token:string
  }