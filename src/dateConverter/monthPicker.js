import { hijriMonths, gergMonths } from '../common/months';
import { moment } from '../common/momentCalendar';
import styles from './DateConverter.module.css';

export const MonthPicker = ({
	selectedMonth,
	setMonth,
	gergInput,
	selectedDate,
	setSelectedDate,
}) => {
	let months = [];

	const setDate = (e) => {
		let year = gergInput ? selectedDate.year() : selectedDate.iYear();
		let day = gergInput ? selectedDate.date() : selectedDate.iDate();
		if (
			moment(
				`${year}-${e.target.value}-${day}`,
				gergInput ? 'YYYY-M-D' : 'iYYYY-iM-iD'
			).isValid()
		) {
			setMonth(e.target.value);
		} else {
			setSelectedDate(
				moment(
					`${year}-${e.target.value}-${28}`,
					gergInput ? 'YYYY-M-D' : 'iYYYY-iM-iD'
				)
			);
		}
	};

	(gergInput ? gergMonths : hijriMonths).forEach((month, index) => {
		months.push(
			<option key={'option' + index} value={index + 1}>
				{month}
			</option>
		);
	});

	return (
		<select
			className={styles.monthPicker}
			name='months'
			id='motnhs'
			value={selectedMonth}
			onChange={(e) => setDate(e)}>
			{months}
		</select>
	);
};
