import React, {useState} from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import styles from "./UserMessage.module.scss";
import MoreHorizontalIcon from "../../../assets/MoreHorizontal";
import {timeSince} from "../../../utils/convertTime";

interface IUserMessage {
    message: IMessage,
    deleteMessage: (id: string) => void,
    editMessage: (text: string, id: string) => void
}

const UserMessage: React.FC<IUserMessage> = ({ message, deleteMessage, editMessage }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(() => !showMenu);

    return (
        <div className={styles.userMessage}>
            <div className={styles.moreButton} onClick={toggleMenu}>
                { showMenu ? <div>
                    <button onClick={() => deleteMessage(message.id)}>Delete</button>
                    <button onClick={() => editMessage(message.text, message.id)}>Edit</button>
                    <button>Close</button>
                </div> : null }
                <MoreHorizontalIcon/>
            </div>
            <div style={{
                backgroundImage: `url(/images/${message.photo})`
            }} className={styles.avatar}/>
            <div className={styles.messageContainer}>
                <div className={styles.messageText}>{message.text}</div>
                <div className={styles.date}>{timeSince(message.date)}</div>
            </div>
        </div>
    );
};

export default UserMessage;