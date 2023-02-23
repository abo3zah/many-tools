import styles from './DateConverter.module.css';

export const YearPicker = ({ selectedYear, setYear }) => {
	let years = [];

	for (let i = 1375; i <= 1475; i++) {
		years.push(
			<option key={'option' + i} value={i}>
				{i}
			</option>
		);
	}

	return (
		<select
			className={styles.yearPicker}
			name='years'
			id='years'
			value={selectedYear}
			onChange={(e) => setYear(e.target.value)}>
			{years}
		</select>
	);
};
