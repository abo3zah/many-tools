import { weekDaysMin } from '../common/months';
import styles from './DateConverter.module.css';

export const WeekDays = () => {
	return (
		<>
			{weekDaysMin.map((day) => (
				<span key={day} className={styles.weekDay}>
					{day}
				</span>
			))}
		</>
	);
};
