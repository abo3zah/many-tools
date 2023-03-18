import { json } from 'd3';
import { useState, useEffect } from 'react';
import { english2arabic } from '../common/english2arabic';

const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate() - 1;

export const useAthanTimes = (lat, lng) => {
	const [data, setData] = useState([]);
	const jsonUrl = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=4`;

	const athanTimeFormater = (d, prayer) => {
		const timeArray = d.data[`${day - 1}`].timings[prayer].split(' ');
		if (+timeArray[0].split(':')[0] > 12) {
			timeArray[0] = `0${+timeArray[0].split(':')[0] - 12}:${
				timeArray[0].split(':')[1]
			} م`;
		} else {
			timeArray[0] = `${timeArray[0]} ص`;
		}
		return english2arabic(timeArray[0]);
	};

	useEffect(() => {
		json(jsonUrl, (error, data) => {
			if (error) {
				data = {
					'الفجر': '00:00',
					'الشروق': '00:00',
					'الظهر': '00:00',
					'العصر': '00:00',
					'المغرب': '00:00',
					'العشاء': '00:00',
					'منتصف الليل': '00:00',
				};
			}
		}).then((d) => {
			console.log(d.data);
			setData({
				'الفجر': athanTimeFormater(d, `Fajr`),
				'الشروق': athanTimeFormater(d, `Sunrise`),
				'الظهر': athanTimeFormater(d, `Dhuhr`),
				'العصر': athanTimeFormater(d, `Asr`),
				'المغرب': athanTimeFormater(d, `Maghrib`),
				'العشاء': athanTimeFormater(d, `Isha`),
				'منتصف الليل': athanTimeFormater(d, `Midnight`),
			});
		});

		console.log(data);
	}, [lat, lng]);

	return data;
};
