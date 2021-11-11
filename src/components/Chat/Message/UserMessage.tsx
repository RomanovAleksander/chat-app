import React from 'react';
import {IMessage} from "../../../interfaces/interfaces";

const UserMessage: React.FC<{ message: IMessage }> = ({ message }) => {
    return (
        <div>{message.text}</div>
    );
};

export default UserMessage;