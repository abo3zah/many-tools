import styles from './athan.module.css';
import { english2arabic } from '../common/english2arabic';

export const RemainingToPrayer = ({ prayerTime }) => {
	const msToTime = (duration) => {
		let seconds = Math.floor((duration / 1000) % 60);
		let minutes = Math.floor((duration / (1000 * 60)) % 60);
		let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		return hours + ':' + minutes + ':' + seconds;
	};

	return (
		<div className={styles.timeToPrayerContainer}>
			<div>الوقت المتبقي على الصلاة:</div>
			<div>{english2arabic(msToTime(prayerTime))}</div>
		</div>
	);
};
