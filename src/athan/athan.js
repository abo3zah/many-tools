import { useState, useEffect } from 'react';
import { useAthanTimes } from './useAthanTimes';
import styles from './athan.module.css';
import { Header } from './header';

export const Athan = () => {
	const [lat, setLat] = useState(24.774265);
	const [lng, setLng] = useState(46.738586);

	useEffect (() => {
		setTimeout(() => {
			navigator.geolocation.getCurrentPosition((position) => {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
			});
		}, 1000);
	},[lat, lng]);

	const athanTimes = useAthanTimes(lat, lng);

	const prayers = [
		'الفجر',
		'الشروق',
		'الظهر',
		'العصر',
		'المغرب',
		'العشاء',
		'منتصف الليل',
	];

	return (
		<div className={styles.container}>
			<div className={styles.athnaContainer}>
				<Header lat={lat} lng={lng} />
				{athanTimes}
			</div>
		</div>
	);
};
