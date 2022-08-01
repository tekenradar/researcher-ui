import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface AuthContextData {
  userID?: string;
  logout: () => void;
}

const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";

export const useAuthContextValue = (): AuthContextData => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const [token, setToken] = useState<string | null>();
  const [userID, setUserID] = useState<string | undefined>();

  const tokenFromURL = searchParams.get('id');

  useEffect(() => {
    if (!tokenFromURL) {
      initSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setToken(tokenFromURL);
  }, [tokenFromURL]);

  useEffect(() => {
    if (!token) {
      return;
    }
    setSearchParams(new URLSearchParams());
    initSession(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  const initSession = async (token?: string) => {
    try {
      const url = new URL(`${apiRoot}/v1/auth/init-session`);
      if (token) {
        url.search = new URLSearchParams({ token: token }).toString()
      }

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setUserID(data.userID);
    } catch (err: any) {
      console.error(err)
      logout();

    } finally {

    }
  }

  const logout = async () => {
    try {
      const url = new URL(`${apiRoot}/v1/auth/logout`);
      if (token) {
        url.search = new URLSearchParams({ token: token }).toString()
      }

      const response = await fetch(url.toString(), {
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      navigate('/login', { replace: true });
    }
  }

  return useMemo(() => {
    return {
      userID: userID,
      logout: logout,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID])
}


export const useAuthContext = (): AuthContextData => {
  const appContext = useContext(AuthContext);

  if (!appContext) {
    throw new Error('useAppContext must be used within the AppContext.Provider');
  }
  return appContext;
}


export const AuthContext = createContext<AuthContextData | undefined>(undefined);
