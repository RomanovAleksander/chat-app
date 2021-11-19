import React from 'react';
import {
  LOGIN_ROUTE,
  CHATS_ROUTE,
  REGISTRATION_ROUTE,
  HOME_ROUTE,
  CONTACT_ROUTE,
  NOTIFICATIONS_ROUTE, CALENDAR_ROUTE, SETTINGS_ROUTE
} from "./utils/consts";
import Form from "./components/Form/Form";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import DevelopingPage from "./pages/DevelopingPage/DevelopingPage";

interface Route {
  path: string,
  Component: React.FC
}

export const publicRoutes: Route[] = [
  {
    path: LOGIN_ROUTE,
    Component: Form
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Form
  }
];

export const privateRoutes: Route[] = [
  {
    path: CHATS_ROUTE,
    Component: ChatsPage
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
