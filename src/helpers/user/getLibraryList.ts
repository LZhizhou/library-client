import { FetchOptions } from "../../interface/FetchOptions";
import { LibraryApiData } from "../../interface/Library";

const getLibraryList = async (token: string): Promise<LibraryApiData> => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
    credentials: "omit",
  };
  return await fetch(
    `http://101.35.91.117:7894/springboot2webapp/customer/getLibList`,
    fetchOptions
  )
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: "Unable to connect to server. Please try again",
    }));
};
export default getLibraryList;
