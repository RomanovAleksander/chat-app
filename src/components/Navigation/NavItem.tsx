import React, {FC} from 'react';
import styles from "./Navigation.module.scss";
import {Link} from "react-router-dom";
import INavItem from "./NavItemInterface";

const NavItem: FC<{ item: INavItem }> = ({ item }) => {
  const { IconComponent, value, link, isActive } = item;

  return (
    <Link className={`${styles.linkWrapper} ${isActive ? `${styles.active}` : ''}`} to={link}>
        <IconComponent />
      <span>{value}</span>
    </Link>
  );
};

export default NavItem;
