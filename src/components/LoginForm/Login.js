import React, {useState} from 'react';
import styles from './LoginForm.module.scss'
import {Link} from 'react-router-dom';

const Login = ({ location }) => {
  const defaultData = {
    email: '', firstName: '',
    lastName: '', password: ''
  };
  const [userData, setUserData] = useState(defaultData);
  const isLogin = (location.pathname === '/login');

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
