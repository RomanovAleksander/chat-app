import React, {FC} from 'react';
import styles from "./ChatsList.module.scss";
import {IChatsListItem} from "./ChatsList";
import {Link} from "react-router-dom";
import {timeSince} from "../../utils/convertTime";
import {getStatus} from "../../utils/getStatus";
import {useChat} from "../../context/ChatContext";
import {useSocket} from "../../context/SocketContext/SocketContext";


const ChatsListItem: FC<{ chat: IChatsListItem }> = ({ chat }) => {
    const { photo, name, time, message, noChecked, id } = chat;
    const { addCurrentChat } = useChat();
    const { readMessages } = useSocket();

    const handleClick = () => {
        addCurrentChat(chat);
        readMessages(id);
    }

    return (
        <Link to={`/chat/${id}`} className={styles.listItemWrapper} onClick={handleClick}>
            <div className={styles.listItem}>
                <div className={styles.itemHeader}>
                    <div className={styles.userInfo}>
                        <div style={{
                            backgroundImage: `url(/images/${photo})`
                        }} className={styles.avatar}/>
                        <div>
                            <div className={styles.name}>{name}</div>
                            <div className={styles.status}>{getStatus(chat)}</div>
                        </div>
                    </div>
                    <div className={styles.time}>{timeSince(time)}</div>
                </div>
                <div className={styles.messageContainer}>
                    <div className={styles.message}>{message}</div>
                    <div className={`${noChecked ? styles.noChecked : ''}`}>
                        <span>{noChecked ? noChecked : null}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ChatsListItem;
