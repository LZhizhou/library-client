import { FetchOptions } from "../../interface/FetchOptions";
import { AdminRoomApiData } from "../../interface/RoomApiData";

const adminGetRoomList = async ({
    libraryID,
    token,
  }: GetRoomListRequest): Promise<AdminRoomApiData> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ libraryID, token }),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/admin/roomList`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default adminGetRoomList;
  export interface GetRoomListRequest{
      token:string,
      libraryID:string,
  }

