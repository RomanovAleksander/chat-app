import React, {useState} from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import styles from "./UserMessage.module.scss";
import MoreHorizontalIcon from "../../../assets/MoreHorizontal";
import {timeSince} from "../../../utils/convertTime";

interface IUserMessage {
    message: IMessage,
    deleteMessage: (id: string) => void,
    editMessage: (text: string, id: string) => void,
    toggleMenu?: () => void
}

const UserMessage: React.FC<IUserMessage> = ({ message, deleteMessage, editMessage }) => {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(() => !showMenu);
    const onDelete = () => deleteMessage(message.id);
    const onEdit = () => editMessage(message.text, message.id);

    return (
        <div className={styles.userMessage}>
            <div className={styles.moreButton} onClick={toggleMenu}>
                { showMenu ? <MessageMenu deleteMessage={onDelete} editMessage={onEdit} toggleMenu={toggleMenu}/> : null }
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

interface IMessageMessage {
    deleteMessage: () => void,
    editMessage: () => void,
    toggleMenu: () => void
}

const MessageMenu: React.FC<IMessageMessage> = ({ deleteMessage, editMessage, toggleMenu }) => {
    return (
        <div>
            <button onClick={deleteMessage}>Delete</button>
            <button onClick={editMessage}>Edit</button>
            <button onClick={toggleMenu}>Close</button>
        </div>
    )
};

export default UserMessage;