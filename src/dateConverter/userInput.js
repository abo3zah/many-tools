import { useEffect, useState } from 'react';
import { WeekDays } from './weekDays';
import { EmptySpan } from './emptySpan';
import { DatePickerHeader } from './datePickerHeader';
import { YearPicker } from './yearPicker';
import { MonthPicker } from './monthPicker';
import { Days } from './days';
import { DateToDate } from './dateToDate';
import { EnhancedDate } from '../common/enhancedDate';
import styles from './DateConverter.module.css';

export const UserInput = ({ gergInput }) => {
	// states
	const [selectedDate, setSelectedDate] = useState(
		new EnhancedDate().startOf('d')
	);
	const [dayNumForStartMonth, setDayNumForStartMonth] = useState(0);
	const [year, setYear] = useState(
		+selectedDate.print(gergInput ? 'YYYY' : 'iYYYY')
	);
	const [month, setMonth] = useState(
		+selectedDate.print(gergInput ? 'M' : 'iM')
	);

	// change the states dependant on the user selection changes
	useEffect(() => {
		setDayNumForStartMonth(
			new EnhancedDate(selectedDate)
				.startOf(gergInput ? 'm' : 'im')
				.getDay()
		);
		setYear(+selectedDate.print(gergInput ? 'YYYY' : 'iYYYY'));
		setMonth(+selectedDate.print(gergInput ? 'M' : 'iM'));
	}, [selectedDate]);

	// adjust the date if year or month changed
	useEffect(() => {
		setSelectedDate(
			gergInput
				? new EnhancedDate(year, month - 1, selectedDate.getDate())
				: new EnhancedDate()
						.startOf('d')
						.getHijriDate(
							year,
							month,
							selectedDate.print('iD')
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
					value={selectedDate.print(
						gergInput
							? 'WDD D-MMM-YYYY'
							: 'WDD iD-iMMM-iYYYY',
						'ar-SA'
					)}
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
