import React from 'react';
import {IMessage} from "../../../interfaces/interfaces";

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
    return (
        <div>{message.text}</div>
    );
};

export default Message;