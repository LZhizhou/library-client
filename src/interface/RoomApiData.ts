
  
  export interface AdminRoomApiData {
    error?: string;
    success?: AdminRoom[];
  }
  
  export interface AdminRoom {
    roomID: string,
    roomName:string;
    capacity: number;
    openStatus:string;
    availableTime:string;
  }

  export interface UserRoom {
    roomID: string,
    capacity: number;
    openStatus:string;
    availableTime:string;
  }

  export interface UserRoomApiData {
    error?: string;
    success?: AdminRoom[];
  }