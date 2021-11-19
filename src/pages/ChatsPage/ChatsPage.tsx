import React, {useEffect, useState} from 'react';
import {Route} from "react-router-dom";
import PlusIcon from "../../assets/PlusIcon";
import ChatsList from "../../components/ChatsList/ChatsList";
import Loader from "../../components/Loader/Loader";
import {useChat} from "../../context/ChatContext";
import Search from "../../components/Search/Search";
import Chat from "../../components/Chat/Chat";
import ChatCreationForm from "../../components/ChatCreationForm/ChatCreationForm";
import {CHAT_ROUTE} from "../../utils/consts";
import styles from './ChatsPage.module.scss';

const ChatPage: React.FC = () => {
    const {getChats, loading, chats} = useChat();
    const [showModal, setShowModal] = useState<boolean>(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        if (!chats) {
            getChats()
        }
    }, [getChats, chats])

    if (loading && !chats) {
        return <Loader/>
    }

    if (chats) {
        return (
            <>
                {showModal && <ChatCreationForm toggleModal={toggleModal} />}
                <div className={styles.pageWrapper}>
                    <div className={styles.wrapper}>
                        <div className={styles.chatsContainer}>
                            <div className={styles.header}>
                                <div className={styles.headerComponent}>
                                    <div className={styles.title}>Chats</div>
                                    <div className={styles.select}>Recent Chats</div>
                                </div>
                                <div className={styles.headerComponent}>
                                    <button className={styles.createButton} onClick={toggleModal}>
                                        <PlusIcon/>
                                        <p>Create new Chat</p>
                                    </button>
                                </div>
                            </div>
                            <Search/>
                            <ChatsList/>
                        </div>
                        <Route path={CHAT_ROUTE}>
                            <Chat/>
                        </Route>
                    </div>
                </div>
            </>
        );
    } else return null
};

export default ChatPage;
