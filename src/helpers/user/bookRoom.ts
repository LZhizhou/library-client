import { FetchOptions } from "../../interface/FetchOptions";
import { LibraryApiData } from "../../interface/Library";
import { SuccessFailResponse } from "../../interface/SuccessFailResponse";

const bookRoom = async (
    bookRoomRequest: BookRoomRequest 
  ): Promise<SuccessFailResponse> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookRoomRequest),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/customer/bookRooms`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default bookRoom;

  export interface BookRoomRequest{
      username:string,
      date:string,
      libraryID:string,
      roomID:string,
      token:string,
  }