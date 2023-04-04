import { useState, createContext } from 'react';
import { Year } from './year';
import { moment } from '../common/momentCalendar';
import { english2arabic } from '../common/english2arabic';
import { aramcoVacation, schoolVacation } from '../data/vacations';
import styles from './calendar.module.css';

export const AramcoVacationContext = createContext([]);
export const SchoolVacationContext = createContext([]);

export const Calendar = () => {
	const [year, setYear] = useState(moment().format('YYYY'));
	const firstDay = english2arabic(
		moment(`${year}-1-1`, 'YYYY-M-D').format('iYYYY')
	);
	const lastDay = english2arabic(
		moment(`${year}-12-31`, 'YYYY-M-D').format('iYYYY')
	);

	const checkEnteredYear = (enteredYear) => {
		setYear(enteredYear);
	};

	// create an array contains all the dates in aramcoVacation array
	const aramcoVacationDates = [];
	aramcoVacation.forEach((vacation) => {
		let start = moment(vacation[0], 'YYYY-M-D');
		let end = moment(vacation[1], 'YYYY-M-D');
		while (start.isSameOrBefore(end)) {
			aramcoVacationDates.push(start.format('YYYY-M-D'));
			start.add(1, 'days');
		}
	});

	// create an array contains all the dates in schoolVacation array
	const schoolVacationDates = [];
	schoolVacation.forEach((vacation) => {
		let start = moment(vacation[0], 'YYYY-M-D');
		let end = moment(vacation[1], 'YYYY-M-D');
		while (start.isSameOrBefore(end)) {
			schoolVacationDates.push(start.format('YYYY-M-D'));
			start.add(1, 'days');
		}
	});

	return (
		<div className={styles.content}>
			<div className={styles.flexContainer}>
				<div
					className={
						styles.hijriYear
					}>{`${firstDay} - ${lastDay} هـ`}</div>
				<input
					type='number'
					pattern='[0-9]*'
					inputMode='numeric'
					id='year'
					placeholder='Enter the year'
					min={1937}
					max={2077}
					value={year}
					onChange={(e) => checkEnteredYear(e.target.value)}
					className={styles.georgianYear}
				/>
			</div>

			<div className={styles.yearContainer}>
				<AramcoVacationContext.Provider value={aramcoVacationDates}>
					<SchoolVacationContext.Provider
						value={schoolVacationDates}>
						<Year year={+year} />
					</SchoolVacationContext.Provider>
				</AramcoVacationContext.Provider>
			</div>
			<div className={styles.legendContainer}>
				<div className={styles.ramdan}>رمضان</div>
				<div className={styles.schoolVacation}>إجازات مدرسية</div>
				<div className={styles.aramcoVacation}>
					إجازات أرامكو السعودية
				</div>
			</div>
		</div>
	);
};
