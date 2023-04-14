import { xml } from 'd3';
import { useState, useEffect } from 'react';

export const useGetCity = (lat, lng) => {
	const [data, setData] = useState('');
	const jsonUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}`;

	useEffect(() => {
		xml(jsonUrl, {
			headers: new Headers({
				'Accept': 'application/json',
				'Accept-Encoding': 'gzip, deflate',
				'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
				'Host': 'api.aladhan.com',
				'Origin': 'https://abo3zah.github.io/',
				'Referer': 'https://abo3zah.github.io/many-tools/#/athan',
			}),
		}).then((d) => {
			setData(
				`${d.documentElement
					.getElementsByTagName('province', '')[0]
					.textContent.replace(' Governorate', '')
					.replace(' governorate', '')
					.replace('Governorate', '')
					.replace(' of', '')
					.replace('governorate', '')}, ${
					d.documentElement.getElementsByTagName(
						'country',
						''
					)[0].textContent
				}`
			);
		});
	}, [lat, lng, jsonUrl]);

	return data;
};
