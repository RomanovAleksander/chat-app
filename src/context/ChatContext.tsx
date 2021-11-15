import React, {useContext, useState, useCallback, FC} from 'react';
import {useHttp} from '../hooks/http.hook';
import {IChatsListItem} from "../components/ChatsList/ChatsList";
import {useAuth} from "./AuthContext";
import {IMessage} from "../interfaces/interfaces";
import {IMessageResponse} from "./SocketContext/SocketContext";

interface IChatContext {
    chats: IChatsListItem[] | null,
    getChats: () => Promise<void>,
    loading: boolean,
    searchQuery: string,
    changeSearchQuery: (p: string) => void,
    messages: IMessage[] | null,
    getMessages: (id: string) => Promise<void>,
    addMessage: (message: IMessageResponse) => void,
    toggleWriting: (room: string) => void
}

const ChatContext = React.createContext({} as IChatContext);

export function useChat() {
    return useContext(ChatContext);
}

const ChatProvider: FC = ({ children }) => {
    const [chats, setChats] = useState<IChatsListItem[] | null>(null);
    const [messages, setMessages] = useState<IMessage[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const {request, loading} = useHttp();
    const {token, user} = useAuth();

    const getChats = useCallback(async () => {
        try {
            const data = await request('/chat-list/0/0', 'GET', null, {
                Authorization: `${token}`
            });
            setChats(data);
        } catch (e) {}
    }, [request, token]);

    const getMessages = useCallback(async (id: string) => {
        try {
            const data = await request(`/chat-room/${id}/0/0`, 'GET', null, {
                Authorization: `${token}`
            });
            console.log(data);
            setMessages(data);
        } catch (e) {}
    }, [request, token])

    const changeSearchQuery = (query: string) => {
        setSearchQuery(query)
    };

    const updateArray = (message: IMessage, idx: number, isRooms: boolean) => {
        if (messages && chats) {
            const updatedRoom = { ...chats[idx], time: message.date, message: message.text, file: message.file };

            if (idx === -1) {
                return isRooms ? chats : [...messages, message];
            }
            return [...messages.slice(0, idx), (isRooms ? updatedRoom : message), ...messages.slice(idx + 1)]
        }
        return isRooms ? chats : messages;
    }

    const addMessage = (message: IMessageResponse) => {
        if (messages && user && chats) {
            let newMessage: IMessage = {} as IMessage;
            const messageIndex = messages.findIndex((item) => item.id === message.id);
            const roomIndex = chats.findIndex((room) => room.id === message.room);

            if (!message.type) {
                message.email === user.email ? newMessage = {...message, type: 'user'}
                    : newMessage = {...message, type: 'member'};
            }

            setChats(updateArray(newMessage, roomIndex, true) as IChatsListItem[]);
            setMessages(updateArray(newMessage, messageIndex, false) as IMessage[]);
        }
    };

    const toggleWriting = (room: string) => {
        if (chats) {
            const roomIndex = chats.findIndex((item) => item.id === room);
            const roomStatus = chats[roomIndex].status === 'dispatch' ? 'writing...' : 'dispatch';
            const updatedRoom = { ...chats[roomIndex], status: roomStatus };

            setChats([...chats.slice(0, roomIndex), updatedRoom, ...chats.slice(roomIndex + 1)]);
        }
    };

    const value: IChatContext = {
        chats, loading, getChats, searchQuery, changeSearchQuery, messages, getMessages, addMessage, toggleWriting
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}

export default ChatProvider;
