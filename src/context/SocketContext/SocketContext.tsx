import io, {Socket} from 'socket.io-client';
import { nanoid } from 'nanoid';

import React, {useContext, useState, useCallback, useEffect, useRef, FC} from 'react';
import {useAuth} from "../AuthContext";

interface ISocketContext {

}

const SocketContext = React.createContext({} as ISocketContext);

export function useSocket() {
    return useContext(SocketContext);
}

const SocketProvider: FC = ({ children }) => {
    const SERVER_URL = 'http://localhost:3001';
    const { token } = useAuth();
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        if (token) {
            socket.current = io(SERVER_URL, {
                auth: {
                    token
                }
            });
        }

        return () => {
            socket.current?.disconnect()
        }
    }, [token])

    const value: ISocketContext = {

    };

    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    );
}

export default SocketProvider;
