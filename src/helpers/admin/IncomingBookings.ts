import { BookingsApiData } from "../../interface/BookingsApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const incomingBookings = async (
  libraryID: string,
  username: string,
  startDate: Date,
  endDate: Date
): Promise<BookingsApiData> => {
  const fetchOptions: FetchOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, libraryID, startDate, endDate }),
    credentials: "include",
  };
  return await fetch(`/admin/incomingBookings`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
};
export default incomingBookings;
