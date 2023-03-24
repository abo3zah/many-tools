import { useGetCity } from './useGetCity';
import { moment } from '../common/momentCalendar';
import { english2arabic } from '../common/english2arabic';
import styles from './athan.module.css';

export const Header = ({ lat, lng }) => {
	const city = useGetCity(lat, lng);

	return (
		<div className={styles.header}>
			<div className={styles.headerText}>{city}</div>
			<div className={styles.headerText}>
				{english2arabic(moment().format('iD - iMMMM - iYYYY هـ'))}
			</div>
			<div className={styles.prayerContainerHeader}>
				<div className={`${styles.ColumnHeader}`}>الصلاة</div>
				<div className={`${styles.ColumnHeader}`}>الوقت</div>
			</div>
		</div>
	);
};
