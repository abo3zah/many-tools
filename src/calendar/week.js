import { useContext } from 'react';
import { HijriMonthsContext, MonthColorContext } from './monthHeader';
import { aramcoVacation, schoolVacation } from '../data/vacations';

const moment = require('moment-hijri');

export const Week = ({ year, month, day }) => {
	let days = [];
	let date = moment(`${year}-${month}-${day}`, 'YYYY-M-D');
	let dayNum = date.day();

	const english2arabic = (s) => s.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
	const colors = useContext(MonthColorContext);
	const arabicMonths = useContext(HijriMonthsContext);

	days.push(
		<div key={`${month}date${date.format()}w`} className='week-number'>
			{date.week()}
		</div>
	);

	date.subtract(dayNum, 'days');

	for (let i = 0; i < dayNum; i++) {
		days.push(
			<div
				className='empty-fileds'
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

		if (moment().startOf('day').isSame(date)) classes.push('today');

		if (date.day() > 4) classes.push('weekend');

		aramcoVacation.forEach((vacation) => {
			moment(date).isBetween(vacation[0], vacation[1], 'day', '[]') &&
				classes.push('aramco-vacation');
		});

		schoolVacation.forEach((vacation) => {
			moment(date).isBetween(vacation[0], vacation[1], 'day', '[]') &&
				classes.push('school-vacation');
		});

		date.format('iM') === '9' && classes.push('ramdan');

		days.push(
			<div
				key={`${month}date${date.format()}`}
				className={`date-container ${classes.join(' ')}`}>
				<span className='georgian'>{date.date()}</span>
				<span
					className={`hijri ${
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
