import styles from './DateConverter.module.css';

export const DatePickerHeader = ({ date }) => {
	return (
		<>
			<span className={styles.datePickerHeader}>{date}</span>
		</>
	);
};
