import React, {useState, useEffect} from 'react';
import styles from './LoginForm.module.scss'
import {Link} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import AuthForm from "../AuthForm/AuthForm";

const Login = ({ location }) => {
  const defaultData = {
    email: '', firstName: '',
    lastName: '', password: ''
  };
  const isLogin = (location.pathname === '/login');
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(defaultData);
  const [token, setToken] = useState(null);
  const {loading, request, error, clearError} = useHttp();

  useEffect(() => {
    clearError();
  }, [error, clearError])

  const handleChange = (event) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await request('/register', 'POST', { email: userData.email });
    setToken(data.token);
    setIsAuth(true);
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (isAuth) {
    return <AuthForm userData={userData} token={token} />
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
