import {useState, useCallback, useEffect} from 'react';
import {useHttp} from './http.hook';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const {request, loading} = useHttp();

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(storageName);
  }, []);

  const login = useCallback(async (jwtToken) => {
    try {
      const data = await request('/find', 'GET', null, {
        Authorization: jwtToken
      });
      setUser(data);

      setToken(jwtToken);
      localStorage.setItem(storageName, JSON.stringify({
        token: jwtToken
      }));
    } catch (e) {
      console.log(e.message);
      logout();
    }
  }, [logout, request]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token);
    }
    setReady(true);
  }, [login])

  return { login, logout, token, ready, user, loading };
}

export default useAuth;
