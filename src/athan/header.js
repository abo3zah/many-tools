import React from 'react'
import { useGetCity } from './useGetCity';
import { EnhancedDate } from '../common/enhancedDate'
import styles from './athan.module.css';

export const Header = ({ lat, lng }) => {
	const city = useGetCity(lat, lng);

	return (
		<div className={styles.header}>
			<div className={styles.headerText}>{city}</div>
			<div className={styles.headerText}>
				{new EnhancedDate().print('iD - iMMMM - iYYYY هـ','ar-SA')}
			</div>
			<div className={styles.prayerContainerHeader}>
				<div className={`${styles.ColumnHeader}`}>الصلاة</div>
				<div className={`${styles.ColumnHeader}`}>الوقت</div>
			</div>
		</div>
	);
};
