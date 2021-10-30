export interface BookingsApiData {
  error?: string;
  success?: Booking[];
}

export interface Booking {
  capacity: number;
  userEmail: string;
  userPhone: string;
  roomID: string;
  startTime: string;
  endTime: string;
  username:string;
  bookingID:string;
}
