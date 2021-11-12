import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./context/AuthContext";
import App from './components/App/App';
import './styles/index.css';
import ChatProvider from "./context/ChatContext";
import SocketProvider from "./context/SocketContext/SocketContext";

ReactDOM.render(
    <AuthProvider>
        <ChatProvider>
            <SocketProvider>
                <App/>
            </SocketProvider>
        </ChatProvider>
    </AuthProvider>, document.getElementById('root'));
