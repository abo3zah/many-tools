import { useState } from 'react';
import { Year } from './year';
import styles from './calendar.module.css';

const moment = require('moment-hijri');

export const Calendar = () => {
	const [year, setYear] = useState(moment().format('YYYY'));
	const english2arabic = (s) => s.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
	const firstDay = english2arabic(
		moment(`${year}-1-1`, 'YYYY-M-D').format('iYYYY')
	);
	const lastDay = english2arabic(
		moment(`${year}-12-31`, 'YYYY-M-D').format('iYYYY')
	);

	const checkEnteredYear = (enteredYear) => {
		setYear(enteredYear);
	};

	return (
		<div className={styles.content}>
			<div className={styles.flexContainer}>
				<div
					className={
						styles.hijriYear
					}>{`${firstDay} - ${lastDay} هـ`}</div>
				<input
					type='number'
					pattern='[0-9]*'
					inputMode='numeric'
					id='year'
					placeholder='Enter the year'
					min={1937}
					max={2077}
					value={year}
					onChange={(e) => checkEnteredYear(e.target.value)}
					className={styles.georgianYear}
				/>
			</div>

			<div className={styles.yearContainer}>
				<Year year={+year} />
			</div>
			<div className={styles.legendContainer}>
				<div className={styles.ramdan}>رمضان</div>
				<div className={styles.schoolVacation}>إجازات مدرسية</div>
				<div className={styles.aramcoVacation}>
					إجازات أرامكو السعودية
				</div>
			</div>
		</div>
	);
};
