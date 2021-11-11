import React, {useEffect} from 'react';
import {useChat} from "../../context/ChatContext";
import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader";
import AttachIcon from "../../assets/AttachIcon";
import MoreIcon from "../../assets/MoreIcon";
import Messages from "./Messages/Messages";
import styles from "./Chat.module.scss";

const Chat: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {getMessages, messages, loading, chats} = useChat();
    const findCurrentChat = (id: string) => {
        if (chats) return chats.find((chat) => chat.id === id)
    };
    const currentChat = findCurrentChat(id);

    useEffect(() => {
        if (id) getMessages(id)
    }, [getMessages, id])

    if (loading && !messages) {
        return <Loader/>
    }

    if (messages && id) {
        return (
            <>
                <div className={styles.header}>
                    <div className={styles.userInfo}>
                        <div style={{
                            backgroundImage: `url(/images/${currentChat?.photo})`
                        }} className={styles.avatar}/>
                        <div>
                            <div className={styles.name}>{currentChat?.name}</div>
                            <div className={styles.status}>{currentChat?.status}</div>
                        </div>
                    </div>
                    <div className={styles.headerButtons}>
                        <button className={styles.btn}>
                            <AttachIcon/>
                        </button>
                        <button className={styles.btn}>
                            <MoreIcon/>
                        </button>
                    </div>
                </div>
                <Messages messages={messages}/>
            </>
        );
    } else return null
};

export default Chat;