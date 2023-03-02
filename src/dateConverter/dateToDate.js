import styles from './DateConverter.module.css';
import { useEffect, useState } from 'react';
import { moment } from '../common/momentCalendar';
import { english2arabic } from '../common/english2arabic';

export const DateToDate = ({ selectedDate, gergInput }) => {
	const [yearDiff, setYearDiff] = useState(
		moment().diff(selectedDate, 'year')
	);
	const [monthDiff, setMonthDiff] = useState(
		moment().diff(selectedDate, 'month')
	);
	const [accurateMonthDiff, setAccurateMonthDiff] = useState(
		moment().diff(selectedDate, 'month', true)
	);

	//create a function to calculate the difference between two dates in years, months and days precisely
	useEffect(() => {
		setYearDiff(moment().diff(selectedDate, 'year'));
		setMonthDiff(moment().diff(selectedDate, 'month'));
		setAccurateMonthDiff(moment().diff(selectedDate, 'month', true));
	}, [selectedDate]);

	return (
		<ul>
			<li className={styles.output}>
				<b>التاريخ {gergInput ? 'الهجري' : 'الميلادي'} هو </b>
				{english2arabic(
					selectedDate.format(
						gergInput
							? 'dddd iD / iMMMM (iM) / iYYYY هـ'
							: 'dddd D / MMMM (M) / YYYY م'
					)
				)}
			</li>
			<li className={styles.output}>
				<b>هذا التاريخ قبل</b> {english2arabic(yearDiff)} سنة و{' '}
				{english2arabic(monthDiff % 12)} شهر و{' '}
				{english2arabic(
					((accurateMonthDiff - monthDiff) * 30).toFixed(0)
				)}{' '}
				يوم {'بالميلادي'}
			</li>
		</ul>
	);
};
