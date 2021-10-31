export interface AdminBookingsApiData {
  error?: string;
  success?: AdminBooking[];
}

export interface AdminBooking {
  capacity: number;
  email: string;
  phone: string;
  roomID: string;
  startTime: string;
  endTime: string;
  username:string;
  reservationID:string;
}
export interface UserBooking {
  roomID: string;
  libraryID:string,
  startTime:string,
  endTime:string
  reservationID:string,
}

export interface UserBookingsApiData {
  error?: string;
  success?: UserBooking[];
}
