import styles from './nav.module.css';

export const SmallerScreenButton = () => (
	<>
		<button className={styles.navbarToggler} type='button'>
			<span className={styles.navbarTogglerIcon}></span>
		</button>
	</>
);
