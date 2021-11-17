import React, {useEffect} from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import Message from "../Message/MemberMessage";
import styles from './Messages.module.scss';
import UserMessage from "../Message/UserMessage";
import {useSocket} from "../../../context/SocketContext/SocketContext";
import {useChat} from "../../../context/ChatContext";
import Loader from "../../Loader/Loader";

const Messages: React.FC<{ messages: IMessage[], focusLastElement: () => void } > = ({ messages, focusLastElement }) => {
    const { setMessageText, setIsCreateMessage, setCurrentMessageId, currentMessageId, loading } = useChat();
    const { deleteMessage } = useSocket();

    const handleDelete = (id: string) => {
        deleteMessage(id);
        if (currentMessageId === id) setMessageText('');
    }

    const handleEdit = (text: string, id: string) => {
        setMessageText(text);
        setIsCreateMessage(false);
        setCurrentMessageId(id);
    }

    useEffect(() => {
        focusLastElement()
    }, [focusLastElement])

    return (
        <div className={styles.messagesContainer}>
            {loading && <Loader />}
            { !loading && (
                messages.map((message) => {
                    return message.type === 'member' ? <Message message={message} key={message.id} />
                        : <UserMessage message={message} key={message.id} deleteMessage={handleDelete} editMessage={handleEdit} />
                })
            )}
            <span id='focusedElement' />
        </div>
    );
};

export default Messages;