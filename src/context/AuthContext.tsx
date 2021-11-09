import React, {useContext, useState, useCallback, useEffect, FC} from 'react';
import {useHttp} from '../hooks/http.hook';

interface IAuthContext {
  token: string | null,
  ready: boolean,
  user: {
    [key: string]: string
  } | null,
  loading: boolean,
  login: (t: string) => void,
  logout: () => void,
}

const AuthContext = React.createContext({} as IAuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider: FC = ({ children }) => {
  const storageName = 'userData';
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{[key: string]: string} | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const {request, loading} = useHttp();

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(storageName);
  }, []);

  const login = useCallback(async (jwtToken) => {
    try {
      const data: {[key: string]: string} | null = await request('/find', 'GET', null, {
        Authorization: jwtToken
      });
      setUser(data);

      setToken(jwtToken);
      localStorage.setItem(storageName, JSON.stringify({
        token: jwtToken
      }));
    } catch (e) {
      logout();
    }
  }, [logout, request]);

  useEffect(() => {
    const data: { token?: string } = JSON.parse(localStorage.getItem(storageName) || '{}');

    if (data && data.token) {
      login(data.token);
    }
    setReady(true);
  }, [login])

  const value: IAuthContext = {
    login, logout, token, ready, user, loading
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
