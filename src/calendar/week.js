import { useContext } from 'react';
import { HijriMonthsContext, MonthColorContext } from './monthHeader';
import { AramcoVacationContext, SchoolVacationContext } from './calendar';
import { english2arabic } from '../common/english2arabic';
import { moment } from '../common/momentCalendar';
import styles from './calendar.module.css';

export const Week = ({ year, month, day }) => {
	let days = [];
	let date = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
	let dayNum = date.day();

	const colors = useContext(MonthColorContext);
	const arabicMonths = useContext(HijriMonthsContext);
	const aramcoVacation = useContext(AramcoVacationContext);
	const schoolVacation = useContext(SchoolVacationContext);

	days.push(
		<div
			key={`${month}date${date.format()}w`}
			className={styles.weekNumber}>
			{date.week()}
		</div>
	);

	date.subtract(dayNum, 'days');

	for (let i = 0; i < dayNum; i++) {
		days.push(
			<div
				className={styles.emptyFileds}
				key={`${month}date${date.format()}`}></div>
		);
		date.add(1, 'days');
	}

	for (let i = 0; i < 7 - dayNum; i++) {
		if (date.month() + 1 !== month) {
			date.add(1, 'days');
			continue;
		}

		let classes = [];

		if (moment().startOf('day').isSame(date)) classes.push(styles.today);

		if (date.day() > 4) classes.push(styles.weekend);

		if (aramcoVacation.includes(date.format('YYYY-M-D')))
			classes.push(styles.aramcoVacation);
		if (schoolVacation.includes(date.format('YYYY-M-D')))
			classes.push(styles.schoolVacation);

		date.format('iM') === '9' && classes.push(styles.ramdan);

		days.push(
			<div
				key={`${month}date${date.format()}`}
				className={`${styles.dateContainer} ${classes.join(' ')}`}>
				<span className={styles.georgian}>{date.date()}</span>
				<span
					className={`${styles.hijri} ${
						colors[arabicMonths.indexOf(date.format('iMMM'))]
					}`}>
					{english2arabic(date.format('iD'))}
				</span>
			</div>
		);
		date.add(1, 'days');
	}

	return <>{days}</>;
};
