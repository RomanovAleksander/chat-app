import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./context/AuthContext";
import App from './components/App/App';
import './styles/index.css';
import ChatProvider from "./context/ChatContext";

ReactDOM.render(
    <AuthProvider>
        <ChatProvider>
            <App/>
        </ChatProvider>
    </AuthProvider>, document.getElementById('root'));
