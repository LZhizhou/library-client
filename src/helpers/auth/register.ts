import { AuthApiData } from "../../interface/AuthApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const register = async (
  {email,
  username,
  password,
  phone,
  }:RegisterRequest
): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, phone }),
    credentials: "omit",
  };
  return await fetch(`http://101.35.91.117:7894/springboot2webapp/register`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: 'Unable to connect to server. Please try again',
    }));
};

export default register;
export interface RegisterRequest{
  username:string,
  password:string,
  phone:string,
  email:string,
}
