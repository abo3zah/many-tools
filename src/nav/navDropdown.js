import styles from './nav.module.css';

export const NavDropdown = ({ text, children }) => (
	<div className={styles.dropdown}>
		<span className={styles.dropdownToggle}>{text}</span>
		<div className={styles.dropdownMenu}>{children}</div>
	</div>
);
