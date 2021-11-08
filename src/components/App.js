import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./AppRouter";
import useAuth from "../hooks/auth.hook";

const App = () => {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <Router>
      <AppRouter user={isAuthenticated}/>
    </Router>
  );
};

export default App;
