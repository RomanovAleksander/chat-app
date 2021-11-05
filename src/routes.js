import {LOGIN_ROUTE, CHAT_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Login from "./components/LoginForm/Login";
import Chat from "./components/Chat";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Login
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Login
  }
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    Component: Chat
  }
];
