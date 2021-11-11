import React, {FC} from 'react';
import styles from "./ChatsList.module.scss";
import {IChatsListItem} from "./ChatsList";

const ChatsListItem: FC<{ chat: IChatsListItem }> = ({ chat }) => {
    const { photo, name, status, time, message, noChecked } = chat;

    return (
        <div className={styles.listItem}>
            <div className={styles.itemHeader}>
                <div className={styles.userInfo}>
                    <div style={{
                        backgroundImage: `url(/images/${photo})`
                    }} className={styles.avatar}/>
                    <div>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.status}>{status}</div>
                    </div>
                </div>
                <div className={styles.time}>{time}</div>
            </div>
            <div className={styles.messageContainer}>
                <div className={styles.message}>{message}</div>
                <div className={`${noChecked ? styles.noChecked : ''}`}>
                    <span>{noChecked ? noChecked : null}</span>
                </div>
            </div>
        </div>
    );
};

export default ChatsListItem;
