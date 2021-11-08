import React from 'react';
import styles from "./Navigation.module.scss";
import {Link} from "react-router-dom";

const NavItem = ({item}) => {
  const { iconComponent, value, link } = item;
  return (
    <Link className={styles.linkWrapper} to={link} >
      {iconComponent}
      <span>{value}</span>
    </Link>
  );
};

export default NavItem;