import { useEffect, useState } from 'react';
import { WeekDays } from './weekDays';
import { EmptySpan } from './emptySpan';
import { DatePickerHeader } from './datePickerHeader';
import { YearPicker } from './yearPicker';
import { MonthPicker } from './monthPicker';

import styles from './DateConverter.module.css';

//define moment module through require
const moment = require('moment-hijri');

export const UserInputHijri = () => {
	// states
	const [userInput, setUserInput] = useState(
		moment().format('iDD/iMM/iYYYY')
	);
	const [selectedDate, setSelectedDate] = useState(moment());
	const [dayNumForStartMonth, setDayNumForStartMonth] = useState(0);
	const [startOfMonth, setStartOfMonth] = useState(
		moment().startOf('iMonth')
	);
	const [endOfMonth, setEndOfMonth] = useState(moment().endOf('iMonth'));
	const [days, setDays] = useState([]);
	const [year, setYear] = useState(moment().format('iYYYY'));
	const [month, setMonth] = useState(moment().format('iM'));

	// change the states dependant on the user selection changes
	useEffect(() => {
		setDayNumForStartMonth(moment(selectedDate).startOf('iMonth').day());
		setStartOfMonth(moment(selectedDate).startOf('iMonth'));
		setEndOfMonth(moment(selectedDate).endOf('iMonth'));
		setUserInput(moment(selectedDate).format('iDD/iMM/iYYYY'));
		setYear(moment(selectedDate).format('iYYYY'));
		setMonth(moment(selectedDate).format('iM'));
	}, [selectedDate]);

	// change the states dependant on the start and the end of the selected month
	useEffect(() => {
		let daysTemp = [];
		let currentDate = moment(startOfMonth);

		while (currentDate <= endOfMonth) {
			daysTemp.push(
				<span
					key={currentDate.format('iD/iM/iYYYY')}
					className={`${styles.day} ${
						currentDate.isSame(selectedDate)
							? styles.today
							: ''
					}`}
					data-date={currentDate.format('YYYY-MM-DD')}
					onClick={(e) =>
						setSelectedDate(
							moment(e.target.attributes[1].nodeValue)
						)
					}>
					{currentDate.format('iD')}
				</span>
			);
			currentDate.add(1, 'days');
		}

		setDays(daysTemp);
	}, [startOfMonth, endOfMonth]);

	useEffect(() => {
		setSelectedDate(
			moment(
				`${year}/${month}/${selectedDate.format('iDD')}`,
				'iYYYY/iM/iD'
			)
		);
	}, [year, month]);

	const checkValidations = (input) => {
		// to allow deleting the date
		if (input.length === 0) return setUserInput(input);

		// to allow only numbers in the first digit
		if (input.length > 0 && input[0] === '/') return;

		// to ensure the enter first entry are less than 30
		if (input.split('/')[0] > 30) return;

		// to ensure the enter second entry are less than 12
		if (input.split('/').length === 2 && input.split('/')[1] > 12) return;

		// to ensure the enter third four digits are less than 9999
		if (input.split('/').length === 3 && input.split('/')[2].length > 4)
			return;

		// to ensure the enter first entry are less than 2 digits
		if (input.split('/')[0].length > 2) return;

		// to ensure the enter second entry are less than 2 digits
		if (input.split('/').length > 1 && input.split('/')[1].length > 2)
			return;

		// to ensure the first entry is not equal to 0
		if (input.split('/')[0] === '0' && input.split('/').length > 1)
			input = input.split('/')[0];

		// to add a leading zero
		if (input.split('/').length === 3) {
			if (input.split('/')[0].length === 1) input = '0' + input;
			if (input.split('/')[1].length === 1)
				input = [
					input.split('/')[0],
					'0' + input.split('/')[1],
					input.split('/')[2],
				].join('/');
		}

		// to set the user input
		setUserInput(input);

		// to check the input validation and set the date if the input is valid
		if (moment(input, 'iDD/iMM/iYYYY').isValid() && input.length === 10)
			setSelectedDate(moment(input, 'iDD/iMM/iYYYY'));
	};

	return (
		<div className={styles.inputGroup}>
			<label className={styles.labels} htmlFor='userInput'>
				التاريخ الهجري
			</label>
			<input
				className={styles.inputs}
				type='text'
				value={userInput}
				onChange={(e) => checkValidations(e.target.value)}
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
				{days}
			</div>
		</div>
	);
};
