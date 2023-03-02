import { MonthHeader } from './monthHeader';
import { Week } from './week';
import { moment } from '../common/momentCalendar';

export const Month = ({ year, month }) => {
	let weeks = [];
	let firstDay = moment(`${year}-${month}-1`, 'YYYY-M-D');
	let firstWeek = firstDay.week();
	let currentWeek = firstDay.week();
	let dayNumber = firstDay.day();

	while (firstDay.month() + 1 === month) {
		weeks.push(
			<Week
				year={year}
				month={month}
				day={firstDay.date()}
				key={`${month}w${currentWeek}`}
			/>
		);
		if (currentWeek === firstWeek) {
			firstDay.add(7 - dayNumber, 'days');
		} else {
			firstDay.add(7, 'days');
		}
		currentWeek += 1;
	}

	return (
		<MonthHeader year={year} month={month}>
			{weeks}
		</MonthHeader>
	);
};
