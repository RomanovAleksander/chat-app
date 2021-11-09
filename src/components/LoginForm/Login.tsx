import React, {useState, useEffect, FC, ChangeEvent, FormEvent} from 'react';
import styles from './LoginForm.module.scss'
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import AuthForm from "../AuthForm/AuthForm";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../../utils/consts";

interface DataInterface {
  [key: string]: string
}

const Login:FC = () => {
  const location = useLocation();
  const defaultData = {
    email: '', firstName: '',
    lastName: '', password: ''
  };
  const isLogin = (location.pathname === LOGIN_ROUTE);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<DataInterface>(defaultData);
  const [token, setToken] = useState<string>('');
  const {loading, request, error, clearError} = useHttp();
  const history = useHistory()

  useEffect(() => {
    clearError();
  }, [error, clearError])

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }

  const setChatRoute = () => {
    history.push(CHAT_ROUTE)
  }

  const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLogin) {
      const data = await request('/register', 'POST', { email: userData.email });
      setToken(data.token);
    } else {
      const data = await request('/login', 'POST', { email: userData.email, password: userData.password });
      setToken(data.token);
    }
    setIsAuth(true);
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (isAuth) {
    return <AuthForm userData={userData} token={token}
                     isLogin={isLogin} setChatRoute={setChatRoute}
    />
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.title}>
        <Link to='/login' className={`${isLogin ? styles.titleLink : null}`}>Sign In</Link>
        <span className={styles.divingLine}>/</span>
        <Link to='/registration' className={`${!isLogin ? styles.titleLink : null}`}>Sign Up</Link>
      </div>
      <div className={styles.inputsWrapper}>
        { !isLogin && (
          <>
            <input type="text" placeholder="First Name"
                   name="firstName" required
                   value={userData.firstName}
                   onChange={handleChange}
            />
            <input type="text" placeholder="Last Name"
                   name="lastName" required
                   value={userData.lastName}
                   onChange={handleChange}
            />
          </>
        )}
        <input type="email" placeholder="E-Mail"
               name="email" required
               value={userData.email}
               onChange={handleChange}
        />
        <input type="password" placeholder="Password"
               name="password" required
               value={userData.password}
               onChange={handleChange}
        />
      </div>
      <button className={styles.submit} type="submit">
        Sign In
      </button>
    </form>
  );
};

export default Login;
