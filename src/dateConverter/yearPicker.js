import styles from './DateConverter.module.css';
import { moment } from '../common/momentCalendar';

export const YearPicker = ({
	selectedYear,
	setYear,
	gergInput,
	selectedDate,
	setSelectedDate,
}) => {
	let years = [];

	let start = gergInput ? 1937 : 1356;
	let end = gergInput ? 2053 : 1475;

	const setDate = (e) => {
		let month = gergInput
			? selectedDate.month() + 1
			: selectedDate.iMonth() + 1;
		let day = gergInput ? selectedDate.date() : selectedDate.iDate();
		if (
			moment(
				`${e.target.value}-${month}-${day}`,
				gergInput ? 'YYYY-M-D' : 'iYYYY-iM-iD'
			).isValid()
		) {
			setYear(e.target.value);
		} else {
			setSelectedDate(
				moment(
					`${e.target.value}-${month}-${28}`,
					gergInput ? 'YYYY-M-D' : 'iYYYY-iM-iD'
				)
			);
		}
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
