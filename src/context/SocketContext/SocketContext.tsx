import io, {Socket} from 'socket.io-client';

import React, {useContext, useState, useCallback, useEffect, useRef, FC} from 'react';
import {useAuth} from "../AuthContext";
import chatPoints from "./chatPoints";
import {useChat} from "../ChatContext";

interface IFile {
    originalName: string;
    size: number;
    buffer: File;
}

export interface IMessageResponse {
    date: number,
    email: string,
    file: {
        name: string,
        size: number,
        type: string,
        href: string
    },
    id: string,
    photo: string,
    status: string,
    text: string,
    room: string,
    type?: string
}

interface ISocketResponse {
    room: string;
    user: string;
}

interface ISocketContext {
    sendMessage: (message: string, id: string, file?: IFile) => void;
    startWriting: (roomId: string) => void;
    stopWriting: (roomId: string) => void;
    deleteMessage: (id: string) => void;
    updateMessage: (id: string, text: string) => void;
}

const SocketContext = React.createContext({} as ISocketContext);

export function useSocket() {
    return useContext(SocketContext);
}

const SocketProvider: FC = ({children}) => {
    const SERVER_URL = 'http://localhost:3001';
    const {token, user} = useAuth();
    const {addMessage, toggleWriting, deleteChatMessage, updateChatMessage} = useChat();
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        if (token) {
            socket.current = io(SERVER_URL, {
                auth: {
                    token
                }
            });
        }

        socket.current?.on(chatPoints.ClientMessage, (message: IMessageResponse) => {
            addMessage(message)
        })


        socket.current?.on(chatPoints.ClientStartWriting, (res: ISocketResponse) => {
            if (res.user !== user?.id) {
                toggleWriting(res.room)
            }
        });

        socket.current?.on(chatPoints.ClientStopWriting, (res: ISocketResponse) => {
            if (res.user !== user?.id) {
                toggleWriting(res.room)
            }
        });

        socket.current?.on(chatPoints.ClientDeleteMessage, (res: string) => {
            deleteChatMessage(res)
        });

        socket.current?.on(chatPoints.ClientUpdate, (message: { id: string, text: string }) => {
            updateChatMessage(message)
        });


        return () => {
            socket.current?.disconnect()
        }
    }, [user, token, addMessage, toggleWriting, deleteChatMessage, updateChatMessage]);

    const startWriting = (roomId: string) => {
        socket.current?.emit(chatPoints.ServerStartWriting, {
            id: roomId,
        });
    };

    const stopWriting = (roomId: string) => {
        socket.current?.emit(chatPoints.ServerStopWriting, {
            id: roomId,
        });
    };

    const sendMessage = (message: string, id: string, file?: IFile) => {
        socket.current?.emit(chatPoints.ServerSendMessage, {
            room: id,
            message,
            file,
        });
    };

    const deleteMessage = (id: string) => {
        socket.current?.emit(chatPoints.ServerDeleteMessage, {
            id
        })
    };

    const updateMessage = (id: string, text: string) => {
        socket.current?.emit(chatPoints.ServerUpdateMessage, {
            id,
            text
        })
    };

    const value: ISocketContext = {
        sendMessage, startWriting, stopWriting, deleteMessage, updateMessage
    };

    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    );
}

export default SocketProvider;
