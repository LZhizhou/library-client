import { Library } from "./Library";

export interface User {
  username: string;
  email?: string;
  phone?: string;
  adress?: string;
  library?: Library;
}