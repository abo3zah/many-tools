import styles from './DateConverter.module.css';

export const WeekDays = () => {
	return (
		<>
			<span className={styles.weekDay}>أ</span>
			<span className={styles.weekDay}>إ</span>
			<span className={styles.weekDay}>ث</span>
			<span className={styles.weekDay}>ر</span>
			<span className={styles.weekDay}>خ</span>
			<span className={styles.weekDay}>ج</span>
			<span className={styles.weekDay}>س</span>
		</>
	);
};
