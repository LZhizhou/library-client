import { FetchOptions } from "../../interface/FetchOptions";
import { AdminRoom } from "../../interface/RoomApiData";
import { SuccessFailResponse } from "../../interface/SuccessFailResponse";

const addRoom = async (request: AdminRoom,token:string): Promise<SuccessFailResponse> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...request,token}),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/admin/addRooms`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default addRoom;
