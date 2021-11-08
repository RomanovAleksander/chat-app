import React, {useRef, useEffect, useState, useContext} from 'react';
import styles from './AuthForm.module.scss';
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from '../../context/AuthContext';

const AuthForm = ({ userData, token, isLogin, setChatRoute }) => {
  const inputEl = useRef(null);
  const [secretKey, setSecretKey] = useState({
    'field-1': '', 'field-2': '', 'field-3': '',
    'field-4': '', 'field-5': '', 'field-6': ''
  });
  const {loading, request, error} = useHttp();
  const auth = useContext(AuthContext);

  const objToString = (obj) => {
    let str ='';
    Object.keys(obj).forEach((key) => {
      str += `${obj[key]}`;
    })
    return str;
  }

  const generateState = (prevState, name, value) => {
    return {
      ...prevState,
      [name]: value
    }
  }

  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;

    handleFocus(maxLength, value, name, generateState(secretKey, name, value));
    setSecretKey(prevState => (generateState(prevState, name, value)));
  };

  const handleFocus = async (maxLength, value, name, state) => {
    const [fieldName, fieldIndex] = name.split("-");
    let fieldIntIndex = parseInt(fieldIndex, 10);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 7) {
        const nextField = document.querySelector(
          `input[name=field-${fieldIntIndex + 1}]`
        );
        if (nextField !== null) {
          nextField.focus();
        } else {
          handleSubmit(state);
        }
      }
    }
  };

  const handleSubmit = async (state) => {
    let data;
    if (!isLogin) {
      data = await request('/register/secret', 'POST', {...userData, secretKey: objToString(state)}, {
        Authorization: token
      });
    } else {
      data = await request('/login/secret', 'POST', {secretKey: objToString(state)}, {
        Authorization: token
      });
    }
    auth.login(data.token);
    setChatRoute();
  }

  useEffect(() => {
    inputEl.current.focus();
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <form className={styles.form}>
      <div className={styles.title}>Authentication</div>
      <div className={styles.inputsContainer}>
        <input ref={inputEl} type="tel" name="field-1"
               pattern="[\d]*" maxLength='1' required
               value={secretKey['field-1']}
               onChange={handleChange}
        />
        <input type="tel" name="field-2" pattern="[\d]*"
               maxLength={1} required
               value={secretKey['field-2']}
               onChange={handleChange}
        />
        <input type="tel" name="field-3" pattern="[\d]*"
               maxLength={1} required
               value={secretKey['field-3']}
               onChange={handleChange}
        />
        <input type="tel" name="field-4" pattern="[\d]*"
               maxLength={1} required
               value={secretKey['field-4']}
               onChange={handleChange}
        />
        <input type="tel" name="field-5" pattern="[\d]*"
               maxLength={1} required
               value={secretKey['field-5']}
               onChange={handleChange}
        />
        <input type="tel" name="field-6" pattern="[\d]*"
               maxLength={1} required
               value={secretKey['field-6']}
               onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default AuthForm;
