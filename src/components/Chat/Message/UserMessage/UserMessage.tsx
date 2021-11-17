import React, {useState, FC} from 'react';
import {IMessage} from "../../../../interfaces/interfaces";
import MoreHorizontalIcon from "../../../../assets/MoreHorizontal";
import {timeSince} from "../../../../utils/convertTime";
import styles from "./UserMessage.module.scss";

interface IUserMessage {
    message: IMessage,
    deleteMessage: (id: string) => void,
    editMessage: (text: string, id: string) => void,
    closeMessageMenu: (id: string) => void,
    toggleMenu?: () => void
}

const UserMessage: FC<IUserMessage> = ({ message, deleteMessage, editMessage, closeMessageMenu }) => {
    const [showMenu, setShowMenu] = useState(false);
    const onDelete = () => deleteMessage(message.id);
    const onEdit = () => editMessage(message.text, message.id);
    const toggleMenu = () => {
        setShowMenu(() => !showMenu);
        closeMessageMenu(message.id);
    };

    return (
        <div className={styles.userMessage}>
            <div className={styles.moreButton} onClick={toggleMenu}>
                { !showMenu && <MoreHorizontalIcon/> }
            </div>
            <div style={{
                backgroundImage: `url(/images/${message.photo})`
            }} className={styles.avatar}/>
            <div className={styles.messageContainer}>
                { showMenu && <MessageMenu deleteMessage={onDelete} editMessage={onEdit} toggleMenu={toggleMenu}/> }
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

const MessageMenu: FC<IMessageMessage> = ({ deleteMessage, editMessage, toggleMenu }) => {
    return (
        <div className={styles.messageMenu}>
            <button onClick={deleteMessage} className={styles.menuButton}>Delete</button>
            <button onClick={editMessage} className={styles.menuButton}>Edit</button>
            <button onClick={toggleMenu} className={styles.menuButton}>Close</button>
        </div>
    )
};

export default UserMessage;
