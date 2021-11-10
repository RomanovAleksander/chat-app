import React, {useRef, useEffect, useState, FC, ChangeEvent} from 'react';
import styles from './AuthForm.module.scss';
import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../context/AuthContext";
import AuthFormInput from "./AuthFormInput";
import Loader from "../Loader/Loader";

interface AuthFormProps {
  userData: object,
  token: string,
  isLogin: boolean,
  setChatRoute(): void
}

interface secretKeyInterface {
  [key: string]: string
}

const AuthForm: FC<AuthFormProps> = ({ userData, token, isLogin, setChatRoute }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [secretKey, setSecretKey] = useState<secretKeyInterface>({
    'field-1': '', 'field-2': '', 'field-3': '',
    'field-4': '', 'field-5': '', 'field-6': ''
  });
  const {loading, request, error} = useHttp();
  const { login } = useAuth();
  const formInputs: secretKeyInterface[] = [
    { name: "field-2" },
    { name: "field-3" },
    { name: "field-4" },
    { name: "field-5" },
    { name: "field-6" },
  ];

  const objToString = (obj: secretKeyInterface) => {
    let str ='';
    Object.keys(obj).forEach((key) => {
      str += `${obj[key]}`;
    })
    return str;
  }

  const generateState = (prevState: secretKeyInterface, name: string, value: string) => {
    return {
      ...prevState,
      [name]: value
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { maxLength, value, name } = e.target;

    handleFocus(maxLength, value, name, generateState(secretKey, name, value));
    setSecretKey(prevState => (generateState(prevState, name, value)));
  };

  const handleFocus = async (maxLength: number, value: string, name: string, state: secretKeyInterface) => {
    const [, fieldIndex] = name.split("-");
    let fieldIntIndex = parseInt(fieldIndex, 10);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 7) {
        const nextField: (HTMLInputElement | null) = document.querySelector(
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

  const handleSubmit = async (state: secretKeyInterface) => {
    let data: any;
    if (!isLogin) {
      data = await request('/register/secret', 'POST', {...userData, secretKey: objToString(state)}, {
        Authorization: token
      });
    } else {
      data = await request('/login/secret', 'POST', {secretKey: objToString(state)}, {
        Authorization: token
      });
    }
    login(data.token);
    setChatRoute();
  }

  useEffect(() => {
    inputEl.current!.focus();
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <form className={styles.form}>
      <div className={styles.title}>Authentication</div>
      <div className={styles.inputsContainer}>
        <input ref={inputEl} type="tel" name="field-1"
               pattern="[\d]*" maxLength={1} required
               value={secretKey['field-1']}
               onChange={handleChange}
        />
        {formInputs.map((item) => {
          return (
              <div key={item.name}>
                <AuthFormInput secretKey={secretKey} onChange={handleChange} name={item.name}/>
              </div>
          )
        })}
      </div>
    </form>
  );
};

export default AuthForm;
