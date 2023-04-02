import { useEffect, useState } from 'react';
import { WeekDays } from './weekDays';
import { EmptySpan } from './emptySpan';
import { DatePickerHeader } from './datePickerHeader';
import { YearPicker } from './yearPicker';
import { MonthPicker } from './monthPicker';
import { Days } from './days';
import { DateToDate } from './dateToDate';
import styles from './DateConverter.module.css';
import {
	setBeginingofMonth,
	getDate,
	getMonth,
	getYear,
	getFullDate,
	getRequiredDate,
	getCurrentDate,
} from '../common/dateOptionsFunctions';

export const UserInput = ({ gergInput }) => {
	// states
	const [selectedDate, setSelectedDate] = useState(getCurrentDate());
	const [dayNumForStartMonth, setDayNumForStartMonth] = useState(0);
	const [year, setYear] = useState(getYear(selectedDate, gergInput));
	const [month, setMonth] = useState(getMonth(selectedDate, gergInput));

	// change the states dependant on the user selection changes
	useEffect(() => {
		setDayNumForStartMonth(
			setBeginingofMonth(selectedDate, gergInput).getDay()
		);
		setYear(getYear(selectedDate, gergInput));
		setMonth(getMonth(selectedDate, gergInput));
	}, [selectedDate]);

	// adjust the date if year or month changed
	useEffect(() => {
		setSelectedDate(
			getRequiredDate(
				year,
				month,
				gergInput ? selectedDate.getDate() : getDate(selectedDate),
				gergInput
			)
		);
	}, [year, month]);

	return (
		<div className={styles.userInputContainer}>
			<div className={styles.inputGroup}>
				<label className={styles.labels} htmlFor='userInput'>
					التاريخ {gergInput ? 'الميلادي' : 'الهجري'}
				</label>
				<input
					className={styles.inputs}
					type='text'
					value={getFullDate(selectedDate, gergInput)}
					placeholder='D/M/YYYY'
					readOnly
				/>
				<div className={styles.popupDiv}>
					<DatePickerHeader
						date={selectedDate}
						gergInput={gergInput}
					/>

					<YearPicker
						selectedYear={year}
						setYear={setYear}
						gergInput={gergInput}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
					/>
					<MonthPicker
						selectedMonth={month}
						setMonth={setMonth}
						gergInput={gergInput}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
					/>

					<WeekDays />
					<EmptySpan dayNumForStartMonth={dayNumForStartMonth} />
					<Days
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						gergInput={gergInput}
					/>
				</div>
			</div>
			<DateToDate selectedDate={selectedDate} gergInput={gergInput} />
		</div>
	);
};
