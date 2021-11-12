import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './Form.module.scss';
import PlusIcon from "../../../assets/PlusIcon";
import SmileIcon from "../../../assets/SmileIcon";
import SendIcon from "../../../assets/SendIcon";

const Form: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('send');
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
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
                       onChange={handleChange}/>
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