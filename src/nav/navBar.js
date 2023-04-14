import React from 'react'
import styles from './nav.module.css';

export const NavBar = ({ children }) => (
	<nav className={styles.navBar}>{children}</nav>
);
