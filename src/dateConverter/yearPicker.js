import styles from './DateConverter.module.css';

export const YearPicker = ({ selectedYear, setYear, gergInput }) => {
	let years = [];

	let start = gergInput ? 1937 : 1356;
	let end = gergInput ? 2053 : 1475;

	const setDate = (e) => {
		setYear(e.target.value);
	};

	for (let i = start; i <= end; i++) {
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
			onChange={(e) => setDate(e)}>
			{years}
		</select>
	);
};
