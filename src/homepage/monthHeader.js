import { createContext, useState } from 'react';

const moment = require('moment-hijri');

moment.locale('ar');

export const MonthColorContext = createContext([
	'first-month-color',
	'second-month-color',
	'third-month-color',
]);

export const HijriMonthsContext = createContext([]);

export const MonthHeader = ({ children, year, month }) => {
	let arabicMonths = [];
	let currentDate = moment(`${year}-${month}-1`, 'YYYY-M-D');
	let monthName = currentDate.format('MMMM');
	const [colors] = useState([
		'first-month-color',
		'second-month-color',
		'third-month-color',
	]);

	for (let i = 0; i < 3; i++) {
		let arabicMonth = currentDate.format('iMMM');
		!arabicMonths.includes(arabicMonth) && arabicMonths.push(arabicMonth);
		currentDate.date() === 1
			? currentDate.add(14, 'days')
			: currentDate.endOf('month');
	}

	return (
		<div className='month-container'>
			<div className='week-number'></div>
			<div className='month-name'>{monthName}</div>
			<div className='month-name'>
				{arabicMonths.map((e, i) => {
					return i === 0 ? (
						<span
							key={`month-hijri${i}`}
							className={`month-hijri-name ${colors[i]}`}>
							{e}
						</span>
					) : (
						<span key={`month-hijri${i}`}>
							&nbsp;-&nbsp;
							<span
								className={`month-hijri-name ${colors[i]}`}>
								{e}
							</span>
						</span>
					);
				})}
			</div>
			<div className='week-number'>#</div>
			<div className='day-inititals'>أ</div>
			<div className='day-inititals'>إ</div>
			<div className='day-inititals'>ث</div>
			<div className='day-inititals'>ر</div>
			<div className='day-inititals'>خ</div>
			<div className='day-inititals'>ج</div>
			<div className='day-inititals'>س</div>
			<MonthColorContext.Provider value={colors}>
				<HijriMonthsContext.Provider value={arabicMonths}>
					{children}
				</HijriMonthsContext.Provider>
			</MonthColorContext.Provider>
		</div>
	);
};
