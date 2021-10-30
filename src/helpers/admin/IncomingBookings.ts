import { BookingsApiData } from "../../interface/BookingsApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const incomingBookings = async (
  {libraryID,
  username,
  startDate,
  endDate,}:IncomingBookingsRequest
): Promise<BookingsApiData> => {
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, libraryID, startDate, endDate }),
    credentials: "include",
  };
  return await fetch(`http://101.35.91.117:7894/springboot2webapp/incomingBookings`, fetchOptions)
    .then((res) => {
      console.log("res:",res)
      return res.json();
    })
    .catch(() => ({
      error:  "Unable to connect to server. Please try again",
    }));
};
export default incomingBookings;

export interface IncomingBookingsRequest{
  libraryID?: string,
  username?: string,
  startDate?: string,
  endDate?: string
}
