import React from 'react'
import { hijriMonths, gergMonths } from '../common/months';
import styles from './DateConverter.module.css';

export const MonthPicker = ({ selectedMonth, setMonth, gergInput }) => {
	let months = [];

	const setDate = (e) => {
		setMonth(e.target.value);
	};

	(gergInput ? gergMonths : hijriMonths).forEach((month, index) => {
		months.push(
			<option key={'option' + index} value={index + 1}>
				{month}
			</option>
		);
	});

	return (
		<select
			className={styles.monthPicker}
			name='months'
			id='months'
			value={selectedMonth}
			onChange={(e) => setDate(e)}>
			{months}
		</select>
	);
};
