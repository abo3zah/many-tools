import { useContext } from 'react';
import { HijriMonthsContext, MonthColorContext } from './monthHeader';
import { AramcoVacationContext, SchoolVacationContext } from './calendar';
import { english2arabic } from '../common/english2arabic';
import {
	getWeekNum,
	getCurrentDate,
	getMonth,
} from '../common/dateOptionsFunctions';
import styles from './calendar.module.css';

export const Week = ({ year, month, day }) => {
	let days = [];
	let date = new Date(`${year}-${month}-${day} 3:00:00`);
	let dayNum = date.getDay();

	const colors = useContext(MonthColorContext);
	const arabicMonths = useContext(HijriMonthsContext);
	const aramcoVacation = useContext(AramcoVacationContext);
	const schoolVacation = useContext(SchoolVacationContext);

	days.push(
		<div
			key={`${month}date${date.toISOString()}w`}
			className={styles.weekNumber}>
			{getWeekNum(date)}
		</div>
	);

	date.setDate(date.getDate() - dayNum);

	for (let i = 0; i < dayNum; i++) {
		days.push(
			<div
				className={styles.emptyFileds}
				key={`${month}date${date.toISOString()}`}></div>
		);
		date.setDate(date.getDate() + 1);
	}

	for (let i = 0; i < 7 - dayNum; i++) {
		if (date.getMonth() + 1 !== month) {
			date.setDate(date.getDate() + 1);
			continue;
		}

		let classes = [];

		if (getCurrentDate().valueOf() === date.valueOf())
			classes.push(styles.today);

		if (date.getDay() > 4) classes.push(styles.weekend);

		if (aramcoVacation.includes(date.toISOString()))
			classes.push(styles.aramcoVacation);
		if (schoolVacation.includes(date.toISOString()))
			classes.push(styles.schoolVacation);

		getMonth(date) === 9 && classes.push(styles.ramdan);

		days.push(
			<div
				key={`${month}date${date.toISOString()}`}
				className={`${styles.dateContainer} ${classes.join(' ')}`}>
				<span className={styles.georgian}>{date.getDate()}</span>
				<span
					className={`${styles.hijri} ${
						colors[arabicMonths.indexOf(date)]
					}`}>
					{english2arabic(date.getDate())}
				</span>
			</div>
		);
		date.setDate(date.getDate() + 1);
	}

	return <>{days}</>;
};
