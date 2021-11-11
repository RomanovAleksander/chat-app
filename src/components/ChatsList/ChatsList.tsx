import React, {FC} from 'react';
import styles from './ChatsList.module.scss';
import ChatsListItem from "./ChatsListItem";
import {useChat} from "../../context/ChatContext";

export interface IChatsListItem {
    id: string,
    name: string,
    photo: string,
    noChecked: number,
    message: string,
    file: string,
    time: number,
    online: boolean,
    isRoom: boolean,
    status: string,
    exitDate: number | boolean,
}

interface IChatsList {
    chats: IChatsListItem[]
}

const ChatsList: FC<IChatsList> = ({ chats }) => {
    const { searchQuery } = useChat();
    const filterChats = () => {
        if (searchQuery === '') {
            return chats;
        }

        return chats.filter(item => {
            return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
        });
    }

    return (
        <div className={styles.chatsList}>
            {filterChats().map((chat) => <ChatsListItem chat={chat} key={chat.id}/>)}
        </div>
    );
};

export default ChatsList;
