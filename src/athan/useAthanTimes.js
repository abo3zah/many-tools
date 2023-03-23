import { useState, useEffect } from 'react';
import { english2arabic } from '../common/english2arabic';
import {
	Coordinates,
	CalculationMethod,
	PrayerTimes,
	SunnahTimes,
	Qibla,
} from 'adhan';
import { moment } from '../common/momentCalendar';
import styles from './athan.module.css';

export const useAthanTimes = (lat, lng) => {
	const [data, setData] = useState([]);

	const dateToString = (date) => {
		return english2arabic(
			date.toLocaleTimeString('ar-sa', {
				hour: '2-digit',
				minute: '2-digit',
			})
		);
	};

	useEffect(() => {
		const coordinates = new Coordinates(lat, lng);
		const params = CalculationMethod.UmmAlQura();
		params.adjustments.isha = moment().format('iM') === '9' ? 30 : 0;
		const date = new Date();
		const prayerTimes = new PrayerTimes(coordinates, date, params);
		const sunnahTimes = new SunnahTimes(prayerTimes);

		console.log(prayerTimes.currentPrayer());
		console.log(Qibla(coordinates));

		setData(
			<>
				<div className={styles.prayerContainer}>
					<div
						className={`${styles.prayerName} ${
							prayerTimes.currentPrayer() === 'fajr'
								? styles.currentPrayer
								: ''
						}`}>
						{'الفجر'}
					</div>
					<div
						className={`${
							prayerTimes.currentPrayer() === 'fajr'
								? styles.currentPrayer
								: ''
						}`}>
						{dateToString(prayerTimes.fajr)}
					</div>

					<div
						className={`${styles.prayerName} ${
							prayerTimes.currentPrayer() === 'sunrise'
								? styles.currentPrayer
								: ''
						}`}>
						{'الشروق'}
					</div>
					<div
						className={`${
							prayerTimes.currentPrayer() === 'sunrise'
								? styles.currentPrayer
								: ''
						}`}>
						{dateToString(prayerTimes.sunrise)}
					</div>

					<div
						className={`${styles.prayerName} ${
							prayerTimes.currentPrayer() === 'dhuhr'
								? styles.currentPrayer
								: ''
						}`}>
						{'الظهر'}
					</div>
					<div
						className={`${
							prayerTimes.currentPrayer() === 'dhuhr'
								? styles.currentPrayer
								: ''
						}`}>
						{dateToString(prayerTimes.dhuhr)}
					</div>

					<div
						className={`${styles.prayerName} ${
							prayerTimes.currentPrayer() === 'asr'
								? styles.currentPrayer
								: ''
						}`}>
						{'العصر'}
					</div>
					<div
						className={`${
							prayerTimes.currentPrayer() === 'asr'
								? styles.currentPrayer
								: ''
						}`}>
						{dateToString(prayerTimes.asr)}
					</div>

					<div
						className={`${styles.prayerName} ${
							prayerTimes.currentPrayer() === 'maghrib'
								? styles.currentPrayer
								: ''
						}`}>
						{'المغرب'}
					</div>
					<div
						className={`${
							prayerTimes.currentPrayer() === 'maghrib'
								? styles.currentPrayer
								: ''
						}`}>
						{dateToString(prayerTimes.maghrib)}
					</div>

					<div
						className={`${styles.prayerName} ${
							prayerTimes.currentPrayer() === 'isha'
								? styles.currentPrayer
								: ''
						}`}>
						{'العشاء'}
					</div>
					<div
						className={`${
							prayerTimes.currentPrayer() === 'isha'
								? styles.currentPrayer
								: ''
						}`}>
						{dateToString(prayerTimes.isha)}
					</div>

					<div className={`${styles.prayerName}`}>
						{'منتصف الليل'}
					</div>
					<div>{dateToString(sunnahTimes.middleOfTheNight)}</div>
				</div>
			</>
		);
	}, [lat, lng]);

	return data;
};
