export interface BookingsApiDataSuccess {
  info: Booking[];
  token: string;
}

export interface BookingsApiData {
  error?: string;
  success?: BookingsApiDataSuccess;
}

export interface Booking {
  capacity: number;
  email: string;
  phone: string;
  roomID: string;
  startTime: Date;
  endTime: Date;
}
