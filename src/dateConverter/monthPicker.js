import styles from './DateConverter.module.css';

export const MonthPicker = ({ selectedMonth, setMonth }) => {
	const hijriMonths = [
		'محرم',
		'صفر',
		'ربيع الأول',
		'ربيع الثاني',
		'جمادى الأولى',
		'جمادى الآخرة',
		'رجب',
		'شعبان',
		'رمضان',
		'شوال',
		'ذو القعدة',
		'ذو الحجة',
	];

	let months = [];

	hijriMonths.forEach((month, index) => {
		months.push(
			<option key={'option' + index} value={index + 1}>
				{month}
			</option>
		);
	});

	return (
		<select
			className={styles.monthPicker}
			name='months'
			id='motnhs'
			value={selectedMonth}
			onChange={(e) => setMonth(e.target.value)}>
			{months}
		</select>
	);
};
