import React, {FC, useEffect, useState} from 'react';
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

const ChatsList: FC = () => {
    const { searchQuery, chats } = useChat();
    const [filteredChats, setFilteredChats] = useState<IChatsListItem[] | null>(chats);

    useEffect(() => {
        const filterChats = (chats: IChatsListItem[]) => {
            return chats.filter(item => {
                return item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
            });
        }

        if (searchQuery === '') setFilteredChats(chats);
        setFilteredChats(chats ? filterChats(chats) : [])
    }, [searchQuery, setFilteredChats, chats])

    return (
        <div className={styles.chatsList}>
            {filteredChats?.map((chat) => <ChatsListItem chat={chat} key={chat.id}/>)}
        </div>
    );
};

export default ChatsList;
