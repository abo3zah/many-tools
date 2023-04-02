import { useEffect, useState } from 'react';
import {
	setBeginingofMonth,
	setEndingofMonth,
	getDate,
} from '../common/dateOptionsFunctions';

import styles from './DateConverter.module.css';

export const Days = ({ selectedDate, setSelectedDate, gergInput }) => {
	const [days, setDays] = useState([]);

	useEffect(() => {
		let daysTemp = [];
		let startOfMonth = setBeginingofMonth(selectedDate, gergInput);
		let endOfMonth = setEndingofMonth(selectedDate, gergInput);
		let currentDate = new Date(startOfMonth);

		while (currentDate.valueOf() <= endOfMonth.valueOf()) {
			daysTemp.push(
				<span
					key={currentDate.toLocaleDateString()}
					className={`${styles.day} ${
						currentDate.valueOf() === selectedDate.valueOf()
							? styles.today
							: ''
					}`}
					data-date={currentDate.toUTCString()}
					onClick={(e) =>
						setSelectedDate(
							new Date(e.target.attributes[1].nodeValue)
						)
					}>
					{getDate(currentDate, gergInput)}
				</span>
			);
			currentDate.setDate(currentDate.getDate() + 1);
		}

		setDays(daysTemp);
	}, [selectedDate]);
	return <>{days}</>;
};
