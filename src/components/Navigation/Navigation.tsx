import React, {FC} from 'react';
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

const Navigation: FC = () => {
  const { user, logout } = useAuth();
  const navItems: INavItem[] = [
    {IconComponent: HomeIcon, value: 'home', link: '/home'},
    {IconComponent: ChatIcon, value: 'chat', link: '/chat'},
    {IconComponent: ContactIcon, value: 'contact', link: '/contact'},
    {IconComponent: NotificationsIcon, value: 'notifications', link: '/notifications'},
    {IconComponent: CalendarIcon, value: 'calendar', link: '/calendar'},
    {IconComponent: SettingsIcon, value: 'settings', link: '/settings'},
  ];

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
  } else return null
};

export default Navigation;
