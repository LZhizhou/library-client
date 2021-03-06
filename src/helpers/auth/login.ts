import { AuthApiData } from "../../interface/AuthApiData";
import { FetchOptions } from "../../interface/FetchOptions";

const login = async (
  username: string,
  password: string
): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "omit",
  };
  return await fetch(`http://101.35.91.117:7894/springboot2webapp/login`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: "Unable to connect to server. Please try again",
    }));
};
export default login;
