import React from 'react'
import styles from './nav.module.css';

export const SmallerScreenButton = ({ menu, setMenu }) => {
	return (
		<>
			<button
				className={styles.navbarToggler}
				type='button'
				onClick={() => setMenu(!menu)}>
				{menu === false ? '➖' : '✖'}
			</button>
		</>
	);
};
