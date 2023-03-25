import { useState, useEffect } from 'react';

const options = {
	calendar: 'islamic-umalqura',
	numberingSystem: 'arab',
	hour12: true,
	hour: '2-digit',
	minute: '2-digit',
};

export const Clock = () => {
	const [date, setDate] = useState(
		new Date().toLocaleTimeString('ar-SA'),
		options
	);

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => {
			clearInterval(timerID);
		};
	}, []);

	const tick = () => {
		setDate(new Date().toLocaleTimeString('ar-SA', options));
	};

	return <>{date}</>;
};
