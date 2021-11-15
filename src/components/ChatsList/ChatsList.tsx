import React, {FC} from 'react';
import ChatsListItem from "./ChatsListItem";
import {useChat} from "../../context/ChatContext";
import styles from './ChatsList.module.scss';

export interface IChatsListItem {
    id: string,
    name: string,
    photo: string,
    noChecked: number,
    message: string,
    file?: string | {
        name: string,
        size: number,
        type: string,
        href: string
    },
    time: number,
    online: boolean,
    isRoom: boolean,
    status: string,
    exitDate: number | false,
}

interface IChatsList {
    chats: IChatsListItem[]
}

const ChatsList: FC<IChatsList> = ({ chats }) => {
    const { searchQuery } = useChat();
    const filterChats = () => {
        console.log('chats: ', chats)
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
