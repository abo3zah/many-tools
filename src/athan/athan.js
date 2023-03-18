import { useEffect, useState } from 'react';
import { useAthanTimes } from './useAthanTimes';
import { useGetCity } from "./useGetCity"
import styles from './athan.module.css';

export const Athan = () => {
	const [lat, setLat] = useState(24.774265);
	const [lng, setLng] = useState(46.738586);

	const getLocation = () => {
		setTimeout(() => {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
			});
		}, 1000);
	};

	const athanTimes = useAthanTimes(lat, lng);

	const city = useGetCity(lat,lng)

	return (
		<div className={styles.container}>
			<div className={styles.athnaContainer}>
				<div className={styles.city}>{city}</div>
				<div className={styles.prayerContainer}>
					<div className={`${styles.header}`}>الصلاة</div>
					<div className={`${styles.header}`}>الوقت</div>
				</div>
				{Object.keys(athanTimes).map((athan) => (
					<div key={athan} className={styles.prayerContainer}>
						<div className={styles.prayerName}>{athan}</div>
						<div>{athanTimes[athan]}</div>
					</div>
				))}
			</div>
			<button onClick={getLocation()}>موقعك</button>
		</div>
	);
};
