import { useEffect, useState } from 'react';
import { moment } from '../common/momentCalendar';

import styles from './DateConverter.module.css';

export const Days = ({ selectedDate, setSelectedDate, gergInput }) => {
	const [days, setDays] = useState([]);

	useEffect(() => {
		let daysTemp = [];
		let startOfMonth = moment(selectedDate).startOf(
			gergInput ? 'month' : 'iMonth'
		);
		let endOfMonth = moment(selectedDate).endOf(
			gergInput ? 'month' : 'iMonth'
		);
		let currentDate = moment(startOfMonth);

		while (currentDate <= endOfMonth) {
			daysTemp.push(
				<span
					key={currentDate.format(
						gergInput ? 'D/M/YYYY' : 'iD/iM/iYYYY'
					)}
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
					{currentDate.format(gergInput ? 'D' : 'iD')}
				</span>
			);
			currentDate.add(1, 'days');
		}

		setDays(daysTemp);
	}, [selectedDate]);
	return <>{days}</>;
};
