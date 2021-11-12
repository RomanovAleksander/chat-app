import React, {FC, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import HomeIcon from '../../assets/HomeIcon';
import ChatIcon from '../../assets/ChatIcon';
import ContactIcon from '../../assets/ContactIcon';
import NotificationsIcon from '../../assets/NotificationsIcon';
import CalendarIcon from '../../assets/CalendarIcon';
import SettingsIcon from '../../assets/SettingsIcon';
import PowerIcon from '../../assets/PowerIcon';
import NavItem from "./NavItem";
import INavItem from "./NavItemInterface";
import styles from './Navigation.module.scss';
import {
  CALENDAR_ROUTE, CHATS_ROUTE, CONTACT_ROUTE,
  HOME_ROUTE, NOTIFICATIONS_ROUTE, SETTINGS_ROUTE
} from "../../utils/consts";

const Navigation: FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeRoute, setActiveRoute] = useState<string>('')
  const isActive = (route: string) => (activeRoute === route);
  const navItems: INavItem[] = [
    {IconComponent: HomeIcon, value: 'home', link: HOME_ROUTE, isActive: isActive(HOME_ROUTE)},
    {IconComponent: ChatIcon, value: 'chat', link: CHATS_ROUTE, isActive: (isActive(CHATS_ROUTE) || isActive(`/chat/${activeRoute.slice(6)}`))},
    {IconComponent: ContactIcon, value: 'contact', link: CONTACT_ROUTE, isActive: isActive(CONTACT_ROUTE)},
    {IconComponent: NotificationsIcon, value: 'notifications', link: NOTIFICATIONS_ROUTE, isActive: isActive(NOTIFICATIONS_ROUTE)},
    {IconComponent: CalendarIcon, value: 'calendar', link: CALENDAR_ROUTE, isActive: isActive(CALENDAR_ROUTE)},
    {IconComponent: SettingsIcon, value: 'settings', link: SETTINGS_ROUTE, isActive: isActive(SETTINGS_ROUTE)},
  ];

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location, activeRoute])

  if (user) {
    return (
        <div className={styles.wrapper}>
          <div className={styles.userNavContainer}>
            <div className={styles.userBlock}>
              <img src={`/images/${user.photo}`} alt="avatar" className={styles.avatar}/>
              <div className={styles.name}>{user.firstName} {user.lastName}</div>
            </div>
            <nav className={styles.navMenu}>
              {navItems.map((item) => {
                return <NavItem item={item} key={item.link} />
              })}
            </nav>
          </div>
          <div className={styles.logoutBlock} onClick={() => logout()}>
            <PowerIcon />
            <span>Log out</span>
          </div>
        </div>
    );
  } else return null
};

export default Navigation;
