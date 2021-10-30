export interface RoomApiDataSuccess {
    info: Room[];
    token: string;
  }
  
  export interface RoomApiData {
    error?: string;
    success?: RoomApiDataSuccess;
  }
  
  export interface Room {
    capacity: number;
    availableTime:string;
    openStatus:string;
    roomID: string,
    RoomName:String,
  }
  