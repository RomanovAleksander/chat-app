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
    toggleWriting: (room: string) => void,
    deleteChatMessage: (id: string) => void,
    addCurrentChat: (chat: IChatsListItem) => void,
    updateChatMessage: (message: {id: string, text: string}) => void,
    currentChat: IChatsListItem | null,
    messageText: string,
    setMessageText: (messageText: string) => void,
    isCreateMessage: boolean,
    setIsCreateMessage: (isCreateMessage: boolean) => void,
    currentMessageId: string,
    setCurrentMessageId: (currentMessageId: string) => void,
    readChatMessages: (res: {room: string, user: string}) => void,
    createChat: (res: any) => void,
}

const ChatContext = React.createContext({} as IChatContext);

export function useChat() {
    return useContext(ChatContext);
}

const ChatProvider: FC = ({ children }) => {
    const [chats, setChats] = useState<IChatsListItem[] | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [currentChat, setCurrentChat] = useState<IChatsListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [messageText, setMessageText] = useState<string>('');
    const [currentMessageId, setCurrentMessageId] = useState<string>('');
    const [isCreateMessage, setIsCreateMessage] = useState<boolean>(true);
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
            setMessages(data);
        } catch (e) {}
    }, [request, token])

    const changeSearchQuery = (query: string) => {
        setSearchQuery(query);
    };

    const updateArray = (array: IMessage[] | IChatsListItem[], message: IMessage, idx: number, isRooms: boolean) => {
        if (chats) {
            if (idx === -1) {
                return isRooms ? array : [...array, message];
            }
            if (isRooms)  {
                const room: any = array[idx];
                const updatedRoom = {
                    ...room, time: message.date, message: message.text, file: message.file,
                    noChecked: message.email !== user?.email ? room.noChecked + 1 : room.noChecked
                };
                return [...array.slice(0, idx), updatedRoom, ...array.slice(idx + 1)]
            }

            return [...array.slice(0, idx), message, ...array.slice(idx + 1)]
        }
        return array;
    };

    const addCurrentChat = (chat: IChatsListItem) => {
        setCurrentChat(chat)
    };

    const addMessage = (message: IMessageResponse) => {
        if (user && chats) {
            let newMessage: IMessage = {} as IMessage;
            const messageIndex = messages.findIndex((item) => item.id === message.id);
            const roomIndex = chats.findIndex((room) => room.id === message.room);

            if (!message.type) {
                message.email === user.email ? newMessage = {...message, type: 'user'}
                    : newMessage = {...message, type: 'member'};
            }

            setChats(updateArray(chats, newMessage, roomIndex, true) as IChatsListItem[]);
            setMessages(updateArray(messages, newMessage, messageIndex, false) as IMessage[]);
        }
    };

    const deleteChatMessage = (id: string) => {
        if (chats && currentChat) {
            const updatedMessages = messages.filter((message) => message.id !== id);
            const lastMessage = updatedMessages[updatedMessages.length - 1];

            const roomIndex = chats.findIndex((room) => room.id === currentChat.id);
            const updatedRoomElement = { ...chats[roomIndex], time: lastMessage.date, message: lastMessage.text, file: lastMessage.file };
            let updatedRooms = [...chats.slice(0, roomIndex), updatedRoomElement, ...chats.slice(roomIndex + 1)];

            setMessages(updatedMessages);
            setChats(updatedRooms);
        }
    };

    const updateChatMessage = (message: { id: string, text: string }) => {
        if (chats && currentChat) {
            let newMessage: IMessage = {} as IMessage;
            const lastMessage = messages[messages.length - 1];
            const messageIndex = messages.findIndex((item) => item.id === message.id);
            const roomIndex = chats.findIndex((room) => room.id === currentChat.id);

            newMessage = {...messages[messageIndex], text: message.text};

            if (lastMessage.id === message.id) setChats(updateArray(chats, newMessage, roomIndex, true) as IChatsListItem[]);

            setMessages(updateArray(messages, newMessage, messageIndex, false) as IMessage[]);
            setIsCreateMessage(true);
            setCurrentMessageId('');
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

    const readChatMessages = (res: {room: string, user: string}) => {
        if (chats) {
            if (user && user.id === res.user) {
                const roomIndex = chats.findIndex((item) => item.id === res.room);

                setChats([...chats.slice(0, roomIndex), { ...chats[roomIndex], noChecked: 0 }, ...chats.slice(roomIndex + 1)]);
            }
        }
    }

    const createChat = (res: any) => {
        if (chats) {
            setChats([...chats, res]);
        }
    }

    const sortByTime = (items: IChatsListItem[]) => items.sort((a, b) => b.time - a.time);

    const value: IChatContext = {
        chats: chats ? sortByTime(chats) : chats, loading, getChats, searchQuery,
        changeSearchQuery, messages, getMessages,
        addMessage, toggleWriting, deleteChatMessage,
        addCurrentChat, updateChatMessage, currentChat,
        setMessageText, messageText, isCreateMessage, setIsCreateMessage,
        currentMessageId, setCurrentMessageId, readChatMessages, createChat
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}

export default ChatProvider;
