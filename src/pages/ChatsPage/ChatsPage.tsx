import React, {useEffect} from 'react';
import PlusIcon from "../../assets/PlusIcon";
import ChatsList from "../../components/ChatsList/ChatsList";
import Loader from "../../components/Loader/Loader";
import {useChat} from "../../context/ChatContext";
import Search from "../../components/Search/Search";
import Chat from "../../components/Chat/Chat";
import styles from './ChatsPage.module.scss';

const ChatPage: React.FC = () => {
    const {getChats, loading, chats} = useChat();

    useEffect(() => {
        getChats()
    }, [getChats])

    if (loading && !chats) {
        return <Loader/>
    }

    if (chats) {
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
                        <Search/>
                        <ChatsList chats={chats}/>
                    </div>
                    <Chat/>
                </div>
            </div>
        );
    } else return null
};

export default ChatPage;
