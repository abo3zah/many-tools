import { getFullDate } from '../common/dateOptionsFunctions';
import styles from './DateConverter.module.css';

export const DatePickerHeader = ({ date, gergInput }) => {
	return (
		<>
			<span className={styles.datePickerHeader}>
				{getFullDate(date, gergInput)}
			</span>
		</>
	);
};
