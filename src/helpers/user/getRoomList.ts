import { FetchOptions } from "../../interface/FetchOptions";
import { RoomApiData } from "../../interface/RoomApiData";

const incomingBookings = async (libraryID: string): Promise<RoomApiData> => {
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ libraryID }),
    credentials: "include",
  };
  return await fetch(
    `http://127.0.0.1:7894/springboot2webapp/customer/roomList`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error:'Unable to connect to server. Please try again',
    }));
};
export default incomingBookings;
