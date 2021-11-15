import React from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import Message from "../Message/MemberMessage";
import styles from './Messages.module.scss';
import UserMessage from "../Message/UserMessage";
import {useSocket} from "../../../context/SocketContext/SocketContext";
import {useChat} from "../../../context/ChatContext";

const Messages: React.FC<{ messages: IMessage[]} > = ({ messages }) => {
    const { setMessageText, setIsCreateMessage, setCurrentMessageId } = useChat();
    const { deleteMessage } = useSocket();

    const handleDelete = (id: string) => {
        deleteMessage(id);
    }

    const handleEdit = (text: string, id: string) => {
        setMessageText(text);
        setIsCreateMessage(false);
        setCurrentMessageId(id);
    }

    return (
        <div className={styles.messagesContainer}>
            {
                messages.map((message) => {
                    return message.type === 'member' ? <Message message={message} key={message.id} />
                        : <UserMessage message={message} key={message.id} deleteMessage={handleDelete} editMessage={handleEdit} />
                })
            }
        </div>
    );
};

export default Messages;