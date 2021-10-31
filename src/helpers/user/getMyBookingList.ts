import { AdminBookingsApiData, UserBooking, UserBookingsApiData } from "../../interface/Booking";
import { FetchOptions } from "../../interface/FetchOptions";
import { IncomingBookingsRequest } from "../admin/IncomingBookings";

const getMyBookingList = async ({
    libraryID,
    username,
    startDate,
    endDate,
    token,
  }: IncomingBookingsRequest): Promise<UserBookingsApiData> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, libraryID, startDate, endDate, token }),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/customer/viewBookings`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default getMyBookingList;