import { User } from './User';

export interface AuthApiDataSuccess {
  info: User
  token: string;
}

export interface AuthApiData {
  error?: string;
  success?: AuthApiDataSuccess;
}