import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import styles from './Navigation.module.scss';
import HomeIcon from '../../assets/HomeIcon';
import ChatIcon from '../../assets/ChatIcon';
import ContactIcon from '../../assets/ContactIcon';
import NotificationsIcon from '../../assets/NotificationsIcon';
import CalendarIcon from '../../assets/CalendarIcon';
import SettingsIcon from '../../assets/SettingsIcon';
import PowerIcon from '../../assets/PowerIcon';
import NavItem from "./NavItem";

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navItems = [
    {iconComponent: <HomeIcon />, value: 'home', link: '/home'},
    {iconComponent: <ChatIcon />, value: 'chat', link: '/chat'},
    {iconComponent: <ContactIcon />, value: 'contact', link: '/contact'},
    {iconComponent: <NotificationsIcon />, value: 'notifications', link: '/notifications'},
    {iconComponent: <CalendarIcon />, value: 'calendar', link: '/calendar'},
    {iconComponent: <SettingsIcon />, value: 'settings', link: '/settings'},
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.userNavContainer}>
        <div className={styles.userBlock}>
          <img src={`/images/${user.photo}`} alt="avatar" className={styles.avatar}/>
          <div className={styles.name}>{user.firstName} {user.lastName}</div>
        </div>
        <nav className={styles.navMenu}>
          {navItems.map((item) => {
            return <NavItem item={item} key={item.link}/>
          })}
        </nav>
      </div>
      <div className={styles.logoutBlock} onClick={() => logout()}>
        <PowerIcon />
        <span>Log out</span>
      </div>
    </div>
  );
};

export default Navigation;