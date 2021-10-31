export interface AdminLibrary{
    address:string,
    closeTime:string,
    email:string,
    libraryID:string,
    name:string,
    openTime:string,
    roomCount:number,
    uRLs:string,
}
export interface UserLibrary{
    libraryID:string,
    name:string,
    roomCount:number,
}
export interface LibraryApiData {
    error?: string;
    success?: UserLibrary[];
  }
  