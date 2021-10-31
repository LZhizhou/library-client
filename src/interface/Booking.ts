export interface AdminBookingsApiData {
  error?: string;
  success?: AdminBooking[];
}

export interface AdminBooking {
  capacity: number;
  userEmail: string;
  userPhone: string;
  roomID: string;
  startTime: string;
  endTime: string;
  username:string;
  bookingID:string;
}
export interface UserBooking {
  roomID: string;
  libraryID:string,
  capacity: number;
  date:string,
  time:string,
  reservationID:string,
}

export interface UserBookingsApiData {
  error?: string;
  success?: AdminBooking[];
}
