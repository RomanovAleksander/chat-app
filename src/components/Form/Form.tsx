import React, {useState, useEffect, FC, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useHttp} from '../../hooks/http.hook';
import ConfirmationForm from "./ConfirmationForm/ConfirmationForm";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import Loader from "../Loader/Loader";
import FormInput from "./FormInput";
import styles from './Form.module.scss';

interface DataInterface {
  [key: string]: string
}

const Form: FC = () => {
  const location = useLocation();
  const defaultData = { email: '', firstName: '', lastName: '', password: '' };
  const isLogin = (location.pathname === LOGIN_ROUTE);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<DataInterface>(defaultData);
  const [token, setToken] = useState<string>('');
  const {loading, request, error, clearError} = useHttp();
  const history = useHistory();
  const formInputs = {
    registration: [
      { value: userData.firstName, placeholder: 'First Name', name: 'firstName' , type: 'text' },
      { value: userData.lastName, placeholder: 'Last Name', name: 'lastName' , type: 'text' },
    ],
    login: [
      { value: userData.email, placeholder: 'E-Mail', name: 'email' , type: 'email' },
      { value: userData.password, placeholder: 'Password', name: 'password' , type: 'password' },
    ]
  }

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
    return <Loader />
  }

  if (isAuth) {
    return <ConfirmationForm userData={userData} token={token}
                             isLogin={isLogin} setChatRoute={setChatRoute} />
  }

  const inputs = (isLogin ? formInputs.login : [...formInputs.registration, ...formInputs.login]);

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.title}>
        <Link to='/login' className={`${isLogin ? styles.titleLink : null}`}>Sign In</Link>
        <span className={styles.divingLine}>/</span>
        <Link to='/registration' className={`${!isLogin ? styles.titleLink : null}`}>Sign Up</Link>
      </div>
      <div className={styles.inputsWrapper}>
        { inputs.map((item) => <FormInput item={item} handleChange={handleChange} key={item.name} />) }
      </div>
      <button className={styles.submit} type="submit">
        {isLogin ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Form;
