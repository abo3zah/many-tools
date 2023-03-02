import { useEffect, useState } from 'react';
import { WeekDays } from './weekDays';
import { EmptySpan } from './emptySpan';
import { DatePickerHeader } from './datePickerHeader';
import { YearPicker } from './yearPicker';
import { MonthPicker } from './monthPicker';
import { Days } from './days';
import { DateToDate } from './dateToDate';
import styles from './DateConverter.module.css';
import { moment } from '../common/momentCalendar';

export const UserInput = ({ gergInput }) => {
	// states
	const [selectedDate, setSelectedDate] = useState(moment());
	const [dayNumForStartMonth, setDayNumForStartMonth] = useState(0);
	const [year, setYear] = useState(
		moment(selectedDate).format(gergInput ? 'YYYY' : 'iYYYY')
	);
	const [month, setMonth] = useState(
		moment(selectedDate).format(gergInput ? 'M' : 'iM')
	);

	// change the states dependant on the user selection changes
	useEffect(() => {
		setDayNumForStartMonth(
			moment(selectedDate)
				.startOf(gergInput ? 'month' : 'iMonth')
				.day()
		);
		setYear(moment(selectedDate).format(gergInput ? 'YYYY' : 'iYYYY'));
		setMonth(moment(selectedDate).format(gergInput ? 'M' : 'iM'));
	}, [selectedDate]);

	useEffect(() => {
		setSelectedDate(
			moment(
				`${year}/${month}/${selectedDate.format(
					gergInput ? 'D' : 'iD'
				)}`,
				gergInput ? 'YYYY/M/D' : 'iYYYY/iM/iD'
			)
		);
	}, [year, month]);

	return (
		<div className={styles.hijriContainer}>
			<div className={styles.inputGroup}>
				<label className={styles.labels} htmlFor='userInput'>
					التاريخ {gergInput ? 'الميلادي' : 'الهجري'}
				</label>
				<input
					className={styles.inputs}
					type='text'
					value={selectedDate.format(
						gergInput
							? 'D / MMMM / YYYY'
							: 'iD / iMMMM / iYYYY هـ'
					)}
					placeholder='D/M/YYYY'
				/>
				<div className={styles.hijriDiv}>
					<DatePickerHeader
						date={selectedDate.format(
							gergInput
								? 'DD / MMM / YYYY'
								: 'iDD / iMMM / iYYYY هـ'
						)}
					/>

					<YearPicker
						selectedYear={year}
						setYear={setYear}
						gergInput={gergInput}
					/>
					<MonthPicker
						selectedMonth={month}
						setMonth={setMonth}
						gergInput={gergInput}
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
