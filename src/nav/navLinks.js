import styles from './nav.module.css';

export const NavLinks = ({ children }) => (
	<div className={styles.navLinksContainer}>{children}</div>
);
