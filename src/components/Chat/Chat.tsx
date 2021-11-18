import React, {useEffect} from 'react';
import {useChat} from "../../context/ChatContext";
import {useParams} from "react-router-dom";
import Loader from "../Loader/Loader";
import AttachIcon from "../../assets/AttachIcon";
import MoreVerticalIcon from "../../assets/MoreVerticalIcon";
import Messages from "./Messages/Messages";
import Form from "./Form/Form";
import {getStatus} from "../../utils/getStatus";
import styles from "./Chat.module.scss";

const Chat: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {getMessages, messages, loading, chats} = useChat();
    const findCurrentChat = (id: string) => {
        if (chats) return chats.find((chat) => chat.id === id)
    };
    const currentChat = findCurrentChat(id);

    // const {getMessages, messages, loading, currentChat} = useChat();
    // const id = currentChat?.id;

    const focusLastElement = () => {
        const element: (HTMLSpanElement | null) = document.querySelector('#focusedElement');
        if (element !== null) element.scrollIntoView();
    }

    useEffect(() => {
        if (id) getMessages(id)
    }, [getMessages, id])

    if (loading && !messages) {
        return <Loader/>
    }

    if (messages && id && currentChat) {
        return (
            <div className={styles.chatContainer}>
                <div className={styles.header}>
                    <div className={styles.userInfo}>
                        <div style={{
                            backgroundImage: `url(/images/${currentChat.photo})`
                        }} className={styles.avatar}/>
                        <div>
                            <div className={styles.name}>{currentChat.name}</div>
                            <div className={styles.status}>{getStatus(currentChat)}</div>
                        </div>
                    </div>
                    <div className={styles.headerButtons}>
                        <button className={styles.btn}>
                            <AttachIcon/>
                        </button>
                        <button className={styles.btn}>
                            <MoreVerticalIcon/>
                        </button>
                    </div>
                </div>
                <Messages messages={messages} focusLastElement={focusLastElement} roomId={id} />
                <Form id={id} focusLastElement={focusLastElement} />
            </div>
        );
    } else return null
};

export default Chat;