import styles from './DateConverter.module.css';

export const DateChangeHeader = ({ date, changeDate, style }) => {
	return (
		<>
			<span
				className={styles.changeSpan}
				onClick={() => changeDate(false)}>
				&lt;
			</span>
			<span className={style}>{date}</span>
			<span
				className={styles.changeSpan}
				onClick={() => changeDate(true)}>
				&gt;
			</span>
		</>
	);
};
