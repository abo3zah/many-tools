import styles from './DateConverter.module.css';

export const DatePickerHeader = ({ date, gergInput }) => {
	return (
		<>
			<span className={styles.datePickerHeader}>
				{date.print(
					gergInput
						? 'D - MMMM - YYYY م'
						: 'iD - iMMM - iYYYY هـ',
					'ar-SA'
				)}
			</span>
		</>
	);
};
