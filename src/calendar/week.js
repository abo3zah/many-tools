import React, { useContext } from 'react';
import { HijriMonthsContext, MonthColorContext } from './monthHeader';
import { AramcoVacationContext, SchoolVacationContext } from './calendar';
import { EnhancedDate } from '../common/enhancedDate';
import styles from './calendar.module.css';

export const Week = ({ year, month, day }) => {
	let days = [];
	let date = new EnhancedDate(year, month - 1, day);
	let dayNum = date.getDay();

	const colors = useContext(MonthColorContext);
	const arabicMonths = useContext(HijriMonthsContext);
	const aramcoVacation = useContext(AramcoVacationContext);
	const schoolVacation = useContext(SchoolVacationContext);

	days.push(
		<div
			key={`${month}date${date.print()}w`}
			className={styles.weekNumber}>
			{date.getWeek()}
		</div>
	);

	date.add(-dayNum);

	for (let i = 0; i < dayNum; i++) {
		days.push(
			<div
				className={styles.emptyFileds}
				key={`${month}date${date.print()}`}></div>
		);
		date.add(1);
	}

	for (let i = 0; i < 7 - dayNum; i++) {
		if (date.getMonth() + 1 !== month) {
			date.add(1);
			continue;
		}

		let classes = [];

		if (new EnhancedDate().startOf('d').isSame(date))
			classes.push(styles.today);

		if (date.getDay() > 4) classes.push(styles.weekend);

		if (aramcoVacation.includes(date.print('YYYY-M-D')))
			classes.push(styles.aramcoVacation);
		if (schoolVacation.includes(date.print('YYYY-M-D')))
			classes.push(styles.schoolVacation);

		date.print('iM') === '9' && classes.push(styles.ramdan);

		days.push(
			<div
				key={`${month}date${date.print()}`}
				className={`${styles.dateContainer} ${classes.join(' ')}`}>
				<span className={styles.georgian}>{date.getDate()}</span>
				<span
					className={`${styles.hijri} ${
						colors[
							arabicMonths.indexOf(
								date.print('iMMM', 'ar-SA')
							)
						]
					}`}>
					{date.print('iD', 'ar-SA')}
				</span>
			</div>
		);
		date.add(1);
	}

	return <>{days}</>;
};
