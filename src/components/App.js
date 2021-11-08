import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from '../context/AuthContext';
import AppRouter from "./AppRouter";
import useAuth from "../hooks/auth.hook";
import Navigation from "./Navigation/Navigation";

const App = () => {
  const { token, ready, login, logout, user, loading } = useAuth();
  const isAuthenticated = !!token;

  if (!ready || loading) {
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated, user
    }}>
      <Router>
        { isAuthenticated && <Navigation /> }
        <AppRouter/>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
