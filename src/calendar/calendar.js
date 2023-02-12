import { useState } from 'react';
import { Year } from './year';
import './calendar.css';

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
		<div className='content'>
			<div className='flex-container'>
				<div className='hijri-year'>{`${firstDay} - ${lastDay} هـ`}</div>
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
					className='georgian-year'
				/>
			</div>

			<div className='year-container'>
				<Year year={+year} />
			</div>
			<div className='legend-container'>
				<div className='ramdan'>رمضان</div>
				<div className='school-vacation'>إجازات مدرسية</div>
				<div className='aramco-vacation'>
					إجازات أرامكو السعودية
				</div>
			</div>

			{/* TODO: legend */}
		</div>
	);
};
