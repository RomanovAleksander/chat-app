import React from 'react';
import styles from './ChatsList.module.scss';
import ChatsListItem from "./ChatsListItem";

const ChatsList: React.FC = () => {
    return (
        <div className={styles.chatsList}>
            <div className={styles.listItem}>
                <ChatsListItem />
            </div>
        </div>
    );
};

export default ChatsList;
