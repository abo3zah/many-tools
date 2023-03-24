import { CalculationMethod, PrayerTimes, SunnahTimes } from 'adhan';
import { Prayer } from './Prayer';
import { moment } from '../common/momentCalendar';
import styles from './athan.module.css';

const PrayersArray = [
	['fajr', 'الفجر'],
	['sunrise', 'الشروق'],
	['dhuhr', 'الظهر'],
	['asr', 'العصر'],
	['maghrib', 'المغرب'],
	['isha', 'العشاء'],
	['middleOfTheNight', 'منتصف الليل'],
];

export const AthanContainer = ({ coordinates }) => {
	const params = CalculationMethod.UmmAlQura();
	const date = new Date();
	params.adjustments.isha = moment(date).format('iM') === '9' ? 30 : 0;
	const prayerTimes = new PrayerTimes(coordinates, date, params);
	const sunnahTimes = new SunnahTimes(prayerTimes);

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
