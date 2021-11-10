import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from '../../context/AuthContext';
import AppRouter from "./AppRouter";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";

const App = () => {
  const { token, ready, loading } = useAuth();
  const isAuthenticated: boolean = !!token;

  if (!ready || loading) {
    return <Loader />
  }

  return (
    <Router>
      {isAuthenticated && <Navigation/>}
      <AppRouter isAuthenticated={isAuthenticated}/>
    </Router>
  );
};

export default App;
