import React from 'react';
import {
  LOGIN_ROUTE,
  CHAT_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
  CONTACT_ROUTE,
  NOTIFICATIONS_ROUTE, CALENDAR_ROUTE, SETTINGS_ROUTE
} from "./utils/consts";
import Login from "./components/LoginForm/Login";
import Chat from "./components/Chat";
import DevelopingPage from "./components/DevelopingPage";

interface Route {
  path: string,
  Component: React.FC
}

export const publicRoutes:Route[] = [
  {
    path: LOGIN_ROUTE,
    Component: Login
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Login
  }
];

export const privateRoutes:Route[] = [
  {
    path: CHAT_ROUTE,
    Component: Chat
  },
  {
    path: HOME_ROUTE,
    Component: DevelopingPage
  },
  {
    path: CONTACT_ROUTE,
    Component: DevelopingPage
  },
  {
    path: NOTIFICATIONS_ROUTE,
    Component: DevelopingPage
  },
  {
    path: CALENDAR_ROUTE,
    Component: DevelopingPage
  },
  {
    path: SETTINGS_ROUTE,
    Component: DevelopingPage
  }
];
