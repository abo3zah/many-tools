import { MonthHeader } from './monthHeader';
import { Week } from './week';
import { EnhancedDate } from '../common/enhancedDate';

export const Month = ({ year, month }) => {
	let weeks = [];
	let firstDay = new EnhancedDate(year, month - 1, 1);
	let firstWeek = firstDay.getWeek();
	let currentWeek = firstDay.getWeek();
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
			firstDay.add(7 - dayNumber);
		} else {
			firstDay.add(7);
		}
		currentWeek += 1;
	}

	return (
		<MonthHeader year={year} month={month}>
			{weeks}
		</MonthHeader>
	);
};
