import { useEffect, useState } from 'react';
import { EnhancedDate } from '../common/enhancedDate';

import styles from './DateConverter.module.css';

export const Days = ({ selectedDate, setSelectedDate, gergInput }) => {
	const [days, setDays] = useState([]);

	useEffect(() => {
		let daysTemp = [];
		let startOfMonth = new EnhancedDate(selectedDate).startOf(
			gergInput ? 'm' : 'im'
		);
		let endOfMonth = new EnhancedDate(selectedDate).endOf(
			gergInput ? 'm' : 'im'
		);
		let currentDate = new EnhancedDate(startOfMonth);

		while (currentDate.isSameOrBefore(endOfMonth)) {
			daysTemp.push(
				<span
					key={currentDate.toLocaleDateString()}
					className={`${styles.day} ${
						currentDate.isSame(selectedDate)
							? styles.today
							: ''
					}`}
					data-date={currentDate.toUTCString()}
					onClick={(e) =>
						setSelectedDate(
							new EnhancedDate(
								e.target.attributes[1].nodeValue
							)
						)
					}>
					{currentDate.print(gergInput ? 'D' : 'iD')}
				</span>
			);
			currentDate.add(1);
		}

		setDays(daysTemp);
	}, [selectedDate]);
	return <>{days}</>;
};
