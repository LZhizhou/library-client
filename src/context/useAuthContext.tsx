import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
// import loginWithCookies from '../helpers/auth/loginWithCookies';
import logoutAPI from '../helpers/auth/logout';
import { useSnackBar } from '../context/useSnackbarContext';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  token:string;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
  token:'',
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [token, setToken] = useState<string>('');
  const history = useHistory();
  const { updateSnackBarMessage } = useSnackBar();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.info);
      setToken(data.token);
      if(data.info.library){
        history.push('/admin');
      }else{
        history.push('/user');
      }
      updateSnackBarMessage(`Welcome Back ${data.info.username}`);
    },
    [history, updateSnackBarMessage],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        updateSnackBarMessage(`GoodBye`);
        setLoggedInUser(null);
      })
      .catch((error) => console.error(error));
  }, [history, updateSnackBarMessage]);

  // // use our cookies to check if we can login straight away
  // useEffect(() => {
  //   const checkLoginWithCookies = async () => {
  //     await loginWithCookies().then((data: AuthApiData) => {
  //       if (data.success) {
  //         updateLoginContext(data.success);
  //         history.push('/home');
  //       } else {
  //         // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
  //         setLoggedInUser(null);
  //         history.push('/home');
  //       }
  //     });
  //   };
  //   checkLoginWithCookies();
  // }, [updateLoginContext, history]);

  return <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout,token }}>{children}</AuthContext.Provider>;
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}