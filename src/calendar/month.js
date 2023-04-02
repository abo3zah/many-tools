import { MonthHeader } from './monthHeader';
import { Week } from './week';
import { getWeekNum } from '../common/dateOptionsFunctions';

export const Month = ({ year, month }) => {
	let weeks = [];
	let firstDay = new Date(year, month-1, 1);
	let firstWeek = getWeekNum(firstDay);
	let currentWeek = getWeekNum(firstDay);
	let dayNumber = firstDay.getDay();

	while (firstDay.getMonth() + 1 === month) {
		weeks.push(
			<Week
				year={year}
				month={month}
				day={firstDay.getDate()}
				key={`${month}w${currentWeek}`}
			/>
		);
		if (currentWeek === firstWeek) {
			firstDay.setDate(firstDay.getDate() + 7 - dayNumber);
		} else {
			firstDay.setDate(firstDay.getDate() + 7);
		}
		currentWeek += 1;
	}

	return (
		<MonthHeader year={year} month={month}>
			{weeks}
		</MonthHeader>
	);
};
