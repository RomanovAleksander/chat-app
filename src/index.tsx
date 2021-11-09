import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./context/AuthContext";
import App from './components/App';
import './styles/index.css';

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>, document.getElementById('root'));
