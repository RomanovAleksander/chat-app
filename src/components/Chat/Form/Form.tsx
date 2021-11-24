import React, {ChangeEvent, FormEvent, useState} from 'react';
import Picker from 'emoji-picker-react';
import PlusIcon from "../../../assets/PlusIcon";
import SmileIcon from "../../../assets/SmileIcon";
import SendIcon from "../../../assets/SendIcon";
import {IFile, useSocket} from "../../../context/SocketContext/SocketContext";
import {useChat} from "../../../context/ChatContext";
import styles from './Form.module.scss';

const Form: React.FC<{ id: string, focusLastElement: () => void }> = ({ id, focusLastElement }) => {
    const { sendMessage, startWriting, stopWriting, updateMessage } = useSocket();
    const { messageText, setMessageText, isCreateMessage, currentMessageId } = useChat();
    const [isPicker, setIsPicker] = useState<boolean>(false);
    const [file, setFile] = useState<string | IFile>('');

    const onEmojiClick = (event:any, emojiObject:any) => {
        setMessageText(messageText + emojiObject.emoji);
    }

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isCreateMessage) {
            sendMessage(messageText, id, file);

            setTimeout(() => {
                setMessageText('');
                setFile('');
            }, 1000)
        } else {
            updateMessage(currentMessageId, messageText);
            setMessageText('');
        }
        setIsPicker(false);
        focusLastElement();
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        setMessageText(event.target.value);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const file = files && files[0];
        if (!file) return;
        setFile({ originalName: file.name, size: file.size, buffer: file });
    };

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
                    <label htmlFor="sendFIle"><PlusIcon/></label>
                    <input type='file' name='file' id="sendFIle"
                           accept='.' className={styles.customFileInput}
                           onChange={handleFileChange} />
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