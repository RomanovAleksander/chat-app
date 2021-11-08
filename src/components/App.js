import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from '../context/AuthContext';
import AppRouter from "./AppRouter";
import useAuth from "../hooks/auth.hook";

const App = () => {
  const { token, ready, login, logout } = useAuth();
  const isAuthenticated = !!token;

  if (!ready) {
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated
    }}>
      <Router>
        <AppRouter/>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
