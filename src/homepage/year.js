import { Month } from './month';

export const Year = ({ year }) => {
	const months = [];

	for (let i = 1; i < 13; i++) {
		months.push(<Month key={i} year={year} month={i} />);
	}
	return months;
};
