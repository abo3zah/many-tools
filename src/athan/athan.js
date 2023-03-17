import { useState } from 'react';
import { useAthanTimes } from './useAthanTimes';
import styles from './athan.module.css';

export const Athan = () => {
	const [lat, setLat] = useState(24.774265);
	const [lng, setLng] = useState(46.738586);
	const athanTimes = useAthanTimes(lat, lng);

	const getLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLat(position.coords.latitude);
			setLng(position.coords.longitude);
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.athnaContainer}>
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
			<div>
				{lat}&nbsp;&nbsp;&nbsp;&nbsp;{lng}
			</div>
			<button onClick={getLocation()}>موقعك</button>
		</div>
	);
};
