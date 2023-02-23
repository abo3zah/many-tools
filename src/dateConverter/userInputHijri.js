import { useEffect, useState } from 'react';
import { WeekDays } from './weekDays';
import { EmptySpan } from './emptySpan';
import { DatePickerHeader } from './datePickerHeader';
import { YearPicker } from './yearPicker';
import { MonthPicker } from './monthPicker';
import { Days } from './days';

import styles from './DateConverter.module.css';

//define moment module through require
const moment = require('moment-hijri');

export const UserInputHijri = () => {
	// states
	const [selectedDate, setSelectedDate] = useState(moment());
	const [dayNumForStartMonth, setDayNumForStartMonth] = useState(0);
	const [year, setYear] = useState(moment().format('iYYYY'));
	const [month, setMonth] = useState(moment().format('iM'));

	// change the states dependant on the user selection changes
	useEffect(() => {
		setDayNumForStartMonth(moment(selectedDate).startOf('iMonth').day());
		setYear(moment(selectedDate).format('iYYYY'));
		setMonth(moment(selectedDate).format('iM'));
	}, [selectedDate]);

	useEffect(() => {
		setSelectedDate(
			moment(
				`${year}/${month}/${selectedDate.format('iDD')}`,
				'iYYYY/iM/iD'
			)
		);
	}, [year, month]);

	return (
		<div className={styles.inputGroup}>
			<label className={styles.labels} htmlFor='userInput'>
				التاريخ الهجري
			</label>
			<input
				className={styles.inputs}
				type='text'
				value={selectedDate.format('iDD / iMMM / iYYYY هـ')}
				placeholder='DD/MM/YYYY'
			/>
			<div className={styles.hijriDiv}>
				<DatePickerHeader
					date={selectedDate.format('iDD / iMMM / iYYYY هـ')}
				/>

				<YearPicker selectedYear={year} setYear={setYear} />
				<MonthPicker selectedMonth={month} setMonth={setMonth} />

				<WeekDays />
				<EmptySpan dayNumForStartMonth={dayNumForStartMonth} />
				<Days
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
			</div>
		</div>
	);
};
