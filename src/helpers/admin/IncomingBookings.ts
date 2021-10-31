import { AdminBookingsApiData } from "../../interface/Booking";
import { FetchOptions } from "../../interface/FetchOptions";

const incomingBookings = async ({
  libraryID,
  username,
  startDate,
  endDate,
  token,
}: IncomingBookingsRequest): Promise<AdminBookingsApiData> => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, libraryID, startDate, endDate, token }),
    credentials: "omit",
  };
  return await fetch(
    `http://101.35.91.117:7894/springboot2webapp/admin/incomingBookings`,
    fetchOptions
  )
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: "Unable to connect to server. Please try again",
    }));
};
export default incomingBookings;

export interface IncomingBookingsRequest {
  libraryID?: string;
  username?: string;
  startDate?: string;
  endDate?: string;
  token: string;
}
