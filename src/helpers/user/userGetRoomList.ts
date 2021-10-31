import { FetchOptions } from "../../interface/FetchOptions";
import { AdminRoomApiData, UserRoomApiData } from "../../interface/RoomApiData";
import { GetRoomListRequest } from "../admin/adminGetRoomList";

const userGetRoomList = async ({
    libraryID,
    token,
  }: GetRoomListRequest): Promise<UserRoomApiData> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ libraryID, token }),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/customer/roomList`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default userGetRoomList;
 
