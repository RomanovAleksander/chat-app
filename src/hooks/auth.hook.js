import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(storageName);
  }, []);

  const login = useCallback(async (jwtToken) => {
    try {
      setToken(jwtToken);

      localStorage.setItem(storageName, JSON.stringify({
        token: jwtToken
      }));
    } catch (e) {
      console.log(e.message);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token);
    }
    setReady(true);
  }, [login])

  return { login, logout, token, ready };
}

export default useAuth;
