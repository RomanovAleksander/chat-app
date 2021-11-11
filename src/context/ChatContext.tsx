import React, {useContext, useState, useCallback, FC} from 'react';
import {useHttp} from '../hooks/http.hook';
import {IChatsListItem} from "../components/ChatsList/ChatsList";
import {useAuth} from "./AuthContext";

interface IChatContext {
    chats: IChatsListItem[] | null,
    getChats: () => Promise<void>,
    loading: boolean,
    searchQuery: string,
    changeSearchQuery: (p: string) => void
}

const ChatContext = React.createContext({} as IChatContext);

export function useChat() {
    return useContext(ChatContext);
}

const ChatProvider: FC = ({ children }) => {
    const [chats, setChats] = useState<IChatsListItem[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const {request, loading} = useHttp();
    const {token} = useAuth();

    const getChats = useCallback(async () => {
        try {
            const data = await request('/chat-list/0/0', 'GET', null, {
                Authorization: `${token}`
            });
            setChats(data);
        } catch (e) {}
    }, [request, token]);

    const changeSearchQuery = (query: string) => {
        setSearchQuery(query)
    };

    const value: IChatContext = {
        chats, loading, getChats, searchQuery, changeSearchQuery
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
}

export default ChatProvider;
