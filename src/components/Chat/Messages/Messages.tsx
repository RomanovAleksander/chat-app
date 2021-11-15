import React from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import Message from "../Message/MemberMessage";
import styles from './Messages.module.scss';
import UserMessage from "../Message/UserMessage";

const Messages: React.FC<{ messages: IMessage[]} > = ({ messages }) => {
    console.log('messages: ', messages)
    return (
        <div className={styles.messagesContainer}>
            {
                messages.map((message) => {
                    return message.type === 'member' ? <Message message={message} key={message.id} />
                        : <UserMessage message={message} key={message.id}/>
                })
            }
        </div>
    );
};

export default Messages;