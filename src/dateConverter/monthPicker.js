import { hijriMonths, gergMonths } from '../common/months';
import styles from './DateConverter.module.css';

export const MonthPicker = ({ selectedMonth, setMonth, gergInput }) => {
	let months = [];

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
			onChange={(e) => setMonth(e.target.value)}>
			{months}
		</select>
	);
};
