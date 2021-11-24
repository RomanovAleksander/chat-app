import React, {FC} from 'react';
import styles from "./ChatsList.module.scss";
import {IChatsListItem} from "./ChatsList";
import {Link} from "react-router-dom";
import {timeSince} from "../../utils/convertTime";
import {getStatus} from "../../utils/getStatus";
import {useChat} from "../../context/ChatContext";
import {useSocket} from "../../context/SocketContext/SocketContext";


const ChatsListItem: FC<{ chat: IChatsListItem }> = ({ chat }) => {
    const { photo, name, time, message, noChecked, id, file } = chat;
    const { addCurrentChat, currentChat } = useChat();
    const { readMessages } = useSocket();
    const isActive = currentChat?.id === id ? styles.activeItem : '';
    const isObject = typeof file === 'object' && file !== null;
    const isString = typeof file === 'string';

    const handleClick = () => {
        addCurrentChat(chat);
        if (noChecked) readMessages(id);
    }

    if (chat) {
        return (
            <Link to={`/chat/${id}`} className={styles.listItemWrapper} onClick={handleClick}>
                <div className={`${styles.listItem} ${isActive}`}>
                    <div className={styles.itemHeader}>
                        <div className={styles.userInfo}>
                            <div style={{
                                backgroundImage: `url(/images/${photo})`
                            }} className={styles.avatar}/>
                            <div>
                                <div className={styles.name}>
                                    {name}
                                </div>
                                <div className={styles.status}>{getStatus(chat)}</div>
                            </div>
                        </div>
                        <div className={styles.time}>{timeSince(time)}</div>
                    </div>
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>
                            {message}
                            { isString && file }
                            { isObject && file?.name }
                        </div>
                        <div className={`${noChecked ? styles.noChecked : ''}`}>
                            <span>{noChecked ? noChecked : null}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    } else {
        return null;
    }
};

export default ChatsListItem;
