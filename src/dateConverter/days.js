import { useEffect, useState } from 'react';

import styles from './DateConverter.module.css';

//define moment module through require
const moment = require('moment-hijri');

export const Days = ({ selectedDate, setSelectedDate }) => {
	const [days, setDays] = useState([]);

	useEffect(() => {
		let daysTemp = [];
		let startOfMonth = moment(selectedDate).startOf('iMonth');
		let endOfMonth = moment(selectedDate).endOf('iMonth');
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
	}, [selectedDate]);
	return <>{days}</>;
};
