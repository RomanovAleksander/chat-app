import React from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import styles from "./UserMessage.module.scss";
import MoreHorizontalIcon from "../../../assets/MoreHorizontal";

const UserMessage: React.FC<{ message: IMessage }> = ({ message }) => {
    return (
        <div className={styles.message}>
            <div className={styles.moreButton}>
                <MoreHorizontalIcon/>
            </div>
            <div style={{
                backgroundImage: `url(/images/${message.photo})`
            }} className={styles.avatar}/>
            <div className={styles.messageContainer}>
                <div className={styles.messageText}>{message.text}</div>
                <div className={styles.date}>2 days ago</div>
            </div>
        </div>
    );
};

export default UserMessage;