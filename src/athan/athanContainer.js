import { CalculationMethod, PrayerTimes, SunnahTimes } from 'adhan';
import { Prayer } from './Prayer';
import styles from './athan.module.css';
import { useEffect } from 'react';

const PrayersArray = [
	['fajr', 'الفجر'],
	['sunrise', 'الشروق'],
	['dhuhr', 'الظهر'],
	['asr', 'العصر'],
	['maghrib', 'المغرب'],
	['isha', 'العشاء'],
	['middleOfTheNight', 'منتصف الليل'],
];

export const AthanContainer = ({ coordinates, setPrayerTime }) => {
	const options = {
		calendar: 'islamic-umalqura',
		month: 'numeric',
	};

	const prayerTimeOptions = {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};

	const params = CalculationMethod.UmmAlQura();
	const date = new Date();
	params.adjustments.isha =
		date.toLocaleDateString('en-SA', options) === '9' ? 30 : 0;
	const prayerTimes = new PrayerTimes(coordinates, date, params);
	const sunnahTimes = new SunnahTimes(prayerTimes);

	console.log(date.toLocaleDateString('en-SA', options));

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => {
			clearInterval(timerID);
		};
	}, [coordinates]);

	const tick = () => {
		const next = prayerTimes.nextPrayer();
		const nextPrayerTime = prayerTimes.timeForPrayer(next);

		const time = new Date()
		const timeToPrayer = nextPrayerTime - time;

		setPrayerTime(parseInt(timeToPrayer));
	};

	return (
		<div className={styles.prayerContainer}>
			{PrayersArray.map((prayer) => {
				if (prayer[0] === 'middleOfTheNight') {
					return (
						<Prayer
							key={prayer[0]}
							prayer={prayer}
							prayerTimes={sunnahTimes}
						/>
					);
				}
				return (
					<Prayer
						key={prayer[0]}
						prayer={prayer}
						prayerTimes={prayerTimes}
					/>
				);
			})}
		</div>
	);
};
