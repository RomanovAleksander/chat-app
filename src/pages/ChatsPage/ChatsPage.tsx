import React from 'react';
import PlusIcon from "../../assets/PlusIcon";
import SearchIcon from "../../assets/SearchIcon";
import ChatsList from "../../components/ChatsList/ChatsList";
import styles from './ChatsPage.module.scss';

const ChatPage: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.chatsContainer}>
                    <div className={styles.header}>
                        <div className={styles.headerComponent}>
                            <div className={styles.title}>Chats</div>
                            <div className={styles.select}>Recent Chats</div>
                        </div>
                        <div className={styles.headerComponent}>
                            <button className={styles.createButton}>
                                <PlusIcon/>
                                <p>Create new Chat</p>
                            </button>
                        </div>
                    </div>
                    <div className={styles.searchContainer}>
                        <SearchIcon/>
                        <input type="search" className={styles.search}
                               id="search-input" placeholder="Search"/>
                        <label htmlFor="search-input">Messages</label>
                    </div>
                    <ChatsList />
                </div>
                <div className={styles.chatContainer}>

                </div>
            </div>
        </div>
    );
};

export default ChatPage;
