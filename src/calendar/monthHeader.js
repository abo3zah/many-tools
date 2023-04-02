import { createContext, useState } from 'react';
import { weekDaysMin } from '../common/months';
import { setEndingofMonth } from '../common/dateOptionsFunctions';
import styles from './calendar.module.css';

export const MonthColorContext = createContext([
	'firstMonthColor',
	'secondMonthColor',
	'thirdMonthColor',
]);

export const HijriMonthsContext = createContext([]);

export const MonthHeader = ({ children, year, month }) => {
	let arabicMonths = [];
	let currentDate = new Date(`${year}-${month}-1`);
	let monthName = currentDate.toLocaleString('ar', {
		month: 'long',
	});
	const [colors] = useState([
		styles.firstMonthColor,
		styles.secondMonthColor,
		styles.thirdMonthColor,
	]);

	for (let i = 0; i < 3; i++) {
		let arabicMonth = currentDate.toLocaleString('ar', {
			calendar:"islamic-umalqura",
			month: 'long',
		});
		!arabicMonths.includes(arabicMonth) && arabicMonths.push(arabicMonth);
		if (currentDate.getDate() === 1){
			currentDate.setDate(currentDate.getDate() + 14)
		} else {
			currentDate = setEndingofMonth(currentDate, true);
		}
	}

	return (
		<div className={styles.monthContainer}>
			<div className={styles.weekNumber}></div>
			<div className={styles.monthName}>{monthName}</div>
			<div className={styles.monthName}>
				{arabicMonths.map((e, i) => {
					return i === 0 ? (
						<span
							key={`month-hijri${i}`}
							className={`${styles.monthHijriName} ${colors[i]}`}>
							{e}
						</span>
					) : (
						<span key={`month-hijri${i}`}>
							&nbsp;-&nbsp;
							<span
								className={`${styles.monthHijriName} ${colors[i]}`}>
								{e}
							</span>
						</span>
					);
				})}
			</div>
			<div className={styles.weekNumber}>#</div>
			{weekDaysMin.map((day) => (
				<div key={day} className={styles.dayInititals}>
					{day}
				</div>
			))}
			<MonthColorContext.Provider value={colors}>
				<HijriMonthsContext.Provider value={arabicMonths}>
					{children}
				</HijriMonthsContext.Provider>
			</MonthColorContext.Provider>
		</div>
	);
};
