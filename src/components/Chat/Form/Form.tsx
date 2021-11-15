import React, {ChangeEvent, FormEvent, useState} from 'react';
import PlusIcon from "../../../assets/PlusIcon";
import SmileIcon from "../../../assets/SmileIcon";
import SendIcon from "../../../assets/SendIcon";
import styles from './Form.module.scss';
import {useSocket} from "../../../context/SocketContext/SocketContext";

const Form: React.FC<{ id: string }> = ({ id }) => {
    const [message, setMessage] = useState('');
    const { sendMessage, startWriting, stopWriting } = useSocket();

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage(message, id);
        setMessage('');
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    const handleFocus = () => {
        startWriting(id);
    }

    const handleBlur = () => {
        stopWriting(id);
    }

    return (
        <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit}>
                <button type='button'>
                    <PlusIcon />
                </button>
                <input type="text" className={styles.formInput}
                       placeholder="Type a message here"
                       value={message}
                       onChange={handleChange}
                       onFocus={handleFocus}
                       onBlur={handleBlur}
                />
                <div className={styles.smileIcon}>
                    <SmileIcon />
                </div>
                <button className={styles.sendBtn} type='submit'>
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};

export default Form;