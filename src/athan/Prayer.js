import React from 'react'
import styles from './athan.module.css';
import { english2arabic } from '../common/english2arabic';

export const Prayer = ({ prayer, prayerTimes }) => {
	const dateToString = (date) => {
		return english2arabic(
			date.toLocaleTimeString('ar-sa', {
				hour: '2-digit',
				minute: '2-digit',
			})
		);
	};

	if (prayer[0] === 'middleOfTheNight') {
		return (
			<>
				<div className={`${styles.prayerName}`}>{prayer[1]}</div>
				<div>{dateToString(prayerTimes[prayer[0]])}</div>
			</>
		);
	}

	return (
		<>
			<div
				className={`${styles.prayerName} ${
					prayerTimes.nextPrayer() === prayer[0] &&
					styles.currentPrayer
				}`}>
				{prayer[1]}
			</div>
			<div
				className={`${
					prayerTimes.nextPrayer() === prayer[0] &&
					styles.currentPrayer
				}`}>
				{dateToString(prayerTimes[prayer[0]])}
			</div>
		</>
	);
};
