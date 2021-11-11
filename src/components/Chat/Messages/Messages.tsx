import React from 'react';
import {IMessage} from "../../../interfaces/interfaces";
import Message from "../Message/Message";
import styles from './Messages.module.scss';
import UserMessage from "../Message/UserMessage";

const Messages: React.FC<{ messages: IMessage[]} > = ({ messages }) => {

    return (
        <div className={styles.container}>
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