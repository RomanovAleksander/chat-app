import React, {ChangeEvent, FormEvent, useState} from 'react';
import Picker from 'emoji-picker-react';
import PlusIcon from "../../../assets/PlusIcon";
import SmileIcon from "../../../assets/SmileIcon";
import SendIcon from "../../../assets/SendIcon";
import {useSocket} from "../../../context/SocketContext/SocketContext";
import {useChat} from "../../../context/ChatContext";
import styles from './Form.module.scss';

const Form: React.FC<{ id: string, focusLastElement: () => void }> = ({ id, focusLastElement }) => {
    const [isPicker, setIsPicker] = useState<boolean>(false);
    const { messageText, setMessageText, isCreateMessage, currentMessageId } = useChat();
    const { sendMessage, startWriting, stopWriting, updateMessage } = useSocket();

    const onEmojiClick = (event:any, emojiObject:any) => {
        setMessageText(messageText + emojiObject.emoji);
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isCreateMessage) {
            sendMessage(messageText, id);
            setMessageText('');
        } else {
            updateMessage(currentMessageId, messageText);
            setMessageText('');
        }
        setIsPicker(false);
        focusLastElement()
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
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
                <button type='button' className={styles.chatsButton}>
                    <PlusIcon />
                </button>
                <input className={styles.formInput}
                            placeholder="Type a message here"
                            value={messageText}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                />
                <div className={styles.smileIcon} onClick={() => setIsPicker(!isPicker)}>
                    <SmileIcon />
                </div>
                <button className={`${styles.chatsButton} ${styles.sendBtn}`} type='submit'>
                    <SendIcon />
                </button>
                { isPicker && <Picker onEmojiClick={onEmojiClick}/> }
            </form>
        </div>
    );
};

export default Form;