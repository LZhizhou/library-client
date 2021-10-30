import { library } from "./Library";

export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  adress?: string;
  library?: library;
}