import { useState, useEffect } from 'react';
import { AthanContainer } from './athanContainer';
import { Coordinates } from 'adhan';
import styles from './athan.module.css';
import { Header } from './header';
import { GetQibla } from './getQibla';

export const Athan = () => {
	const [lat, setLat] = useState(24.774265);
	const [lng, setLng] = useState(46.738586);
	const [coordinates, setCoordinates] = useState(new Coordinates(lat, lng));

	setTimeout(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setLat(position.coords.latitude);
			setLng(position.coords.longitude);
		});
	}, 1000);

	useEffect(() => {
		setCoordinates(new Coordinates(lat, lng));
	}, [lat, lng]);

	return (
		<div className={styles.container}>
			<div className={styles.athnaContainer}>
				<Header lat={lat} lng={lng} />
				<AthanContainer coordinates={coordinates} />
				<GetQibla coordinates={coordinates} />
			</div>
		</div>
	);
};
