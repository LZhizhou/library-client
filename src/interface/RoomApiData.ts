
  
  export interface RoomApiData {
    error?: string;
    success?: Room[];
  }
  
  export interface Room {
    roomID: string,
    capacity: number;
    openUntil:string;
    available:string;
    openingHours:String,
  }
  