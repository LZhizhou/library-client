import { string } from "yup/lib/locale";
import { FetchOptions } from "../../interface/FetchOptions";
import { SuccessFailResponse } from "../../interface/SuccessFailResponse";

export  interface CancelBookingRequest{
    reservationID:string,
    token:string,
  }
const cancelBooking = async ({
    reservationID,
    token,
  }: CancelBookingRequest): Promise<SuccessFailResponse> => {
    const fetchOptions: FetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationID, token }),
      credentials: "omit",
    };
    return await fetch(
      `http://101.35.91.117:7894/springboot2webapp/admin/cancelBooking`,
      fetchOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch(() => ({
        error: "Unable to connect to server. Please try again",
      }));
  };
  export default cancelBooking;

