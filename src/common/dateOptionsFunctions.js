const hijri = {
	calendar: 'islamic-umalqura',
};
const gregory = {
	calendar: 'gregory',
};
const yearOption = {
	year: 'numeric',
};
const monthOption = {
	month: 'numeric',
};
const dayOption = {
	day: 'numeric',
};

export const setBeginingofMonth = (date, gergInput = false) => {
	let newDate = new Date(date);
	let diff =
		newDate.toLocaleString('en', {
			calendar: 'islamic-umalqura',
			...dayOption,
		}) - 1;
	gergInput ? newDate.setDate(1) : newDate.setDate(newDate.getDate() - diff);
	return newDate;
};

export const getWeekNum = (date) => {
	var onejan = new Date(date.getFullYear(), 0, 1);
	return Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
}

export const setEndingofMonth = (date, gergInput = false) => {
	let [, month, year] = getDateComponentFromDate(date, gergInput);

	if (month === 12) {
		year += 1;
		month = 1;
	} else {
		month += 1;
	}

	let newDate = getRequiredDate(year, month, 1, gergInput);
	newDate.setDate(newDate.getDate() - 1);

	return newDate;
};

export const getDate = (date, gergInput = false) => {
	return gergInput
		? date.getDate()
		: date.toLocaleString('en', {
				...hijri,
				...dayOption,
		  });
};

export const getDay = (date, gergInput = false) => {
	return gergInput
		? +date.getDay()
		: +date.toLocaleString('en', {
				...hijri,
				...dayOption,
		  });
};

export const getMonth = (date, gergInput = false) => {
	return gergInput
		? +date.getMonth() + 1
		: +date.toLocaleString('en', {
				...hijri,
				...monthOption,
		  });
};

export const getYear = (date, gergInput = false) => {
	return gergInput
		? +date.getFullYear()
		: +date
				.toLocaleString('en', {
					...hijri,
					...yearOption,
				})
				.split(' ')[0];
};

export const getFullDate = (date, gergInput = false) => {
	return gergInput
		? date.toLocaleDateString('ar', {
				...gregory,
				dateStyle: 'full',
		  })
		: date.toLocaleDateString('ar', {
				...hijri,
				dateStyle: 'full',
		  });
};

const toDateValue = (year, month, day) => {
	return +year * ((19 * 354 + 11 * 355) / 30) + +month * 29.53055 + +day;
};

export const getCurrentDate = () => {
	return new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate()
	);
};

const relativeDateFormat = (number, select = 1) => {
	let sentance = [];
	switch (select) {
		case 1:
			sentance = ['يوم', 'يومين', 'أيام'];
			break;
		case 2:
			sentance = ['شهر', 'شهرين', 'أشهر'];
			break;
		case 3:
			sentance = ['سنة', 'سنتين', 'سنوات'];
			break;

		default:
			break;
	}

	number = Math.abs(number);

	return `${number > 2 ? number : ''} ${
		number < 1
			? ''
			: number == 1
			? sentance[0]
			: number == 2
			? sentance[1]
			: number < 11
			? sentance[2]
			: sentance[0]
	}`;
};

const arabicAnd = (days, months, years = 0, select = 1) => {
	return select === 1
		? `${Math.abs(months) >= 1 && Math.abs(days) >= 1 ? 'و' : ''}`
		: `${
				Math.abs(years) >= 1 && (Math.abs(days) >= 1 || Math.abs(months) >= 1)
					? 'و'
					: ''
		  }`;
};

export const findDateDifference = (date) => {
	let currentDate = getCurrentDate();

	var currentYear = currentDate.getFullYear();
	var currentMonth = currentDate.getMonth();
	var currentDay = currentDate.getDate();

	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();

	var differenceInYears = currentYear - year;
	var differenceInMonths = currentMonth - month;
	var differenceInDays = currentDay - day;

	if (currentDate.valueOf() >= date.valueOf()) {
		if (differenceInDays < 0) {
			differenceInMonths -= 1;
			differenceInDays += 30;
		}

		if (differenceInMonths < 0) {
			differenceInYears -= 1;
			differenceInMonths += 12;
		}
	}

	var years = differenceInYears;
	var months = differenceInMonths;
	var days = differenceInDays;

	let message = 'هو تاريخ اليوم';
	if (currentDate.valueOf() > date.valueOf()) {
		message = `قبل ${relativeDateFormat(days)} ${arabicAnd(
			days,
			months
		)} ${relativeDateFormat(months, 2)} ${arabicAnd(
			days,
			months,
			years,
			2
		)} ${relativeDateFormat(years, 3)}`;
	} else if (currentDate.valueOf() < date.valueOf()) {
		message = `سيكون بعد ${relativeDateFormat(days)} ${arabicAnd(
			days,
			months
		)} ${relativeDateFormat(months, 2)} ${arabicAnd(
			days,
			months,
			years,
			2
		)} ${relativeDateFormat(years, 3)}`;
	}

	return message;
};

const getDateComponentFromDate = (date, gergInput) => {
	let day, month, year;
	if (gergInput) {
		day = date.getDate();
		month = date.getMonth() + 1;
		year = date.getFullYear();
	} else {
		day = +date.toLocaleDateString('en', {
			calendar: 'islamic-umalqura',
			day: 'numeric',
		});
		month = +date.toLocaleDateString('en', {
			calendar: 'islamic-umalqura',
			month: 'numeric',
		});
		year = +date
			.toLocaleDateString('en', {
				calendar: 'islamic-umalqura',
				year: 'numeric',
			})
			.split(' ')[0];
	}

	return [day, month, year];
};

const calculateDiffFromCurrent = (year, month, day) => {
	const [currentDay, currentMonth, currentYear] = getDateComponentFromDate(
		getCurrentDate()
	);

	let currentDateValue = toDateValue(currentYear, currentMonth, currentDay);
	let estimateDateValue = toDateValue(year, month, day);

	return adjustDate(currentDateValue - estimateDateValue, year, month, day);
};

const checkAndAdjust = (estimatedDate, year, month, day, count = 0) => {
	const [estimatedDay, estimatedMonth, estimatedYear] =
		getDateComponentFromDate(estimatedDate);

	if (count > 20) return estimatedDate;

	if (estimatedYear > year) {
		estimatedDate.setDate(estimatedDate.getDate() - 1);
	} else if (estimatedYear < year) {
		estimatedDate.setDate(estimatedDate.getDate() + 1);
	} else if (estimatedMonth > month) {
		estimatedDate.setDate(estimatedDate.getDate() - 1);
	} else if (estimatedMonth < month) {
		estimatedDate.setDate(estimatedDate.getDate() + 1);
	} else if (estimatedDay > day) {
		estimatedDate.setDate(estimatedDate.getDate() - 1);
	} else if (estimatedDay < day) {
		estimatedDate.setDate(estimatedDate.getDate() + 1);
	} else {
		return estimatedDate;
	}
	count += 1;

	return checkAndAdjust(estimatedDate, year, month, day, count);
};

const adjustDate = (diff, year, month, day) => {
	let estimatedDate = getCurrentDate();

	estimatedDate.setDate(-diff + estimatedDate.getDate());

	estimatedDate = checkAndAdjust(estimatedDate, year, month, day);

	return estimatedDate;
};

export const getRequiredDate = (year, month, day, gergInput = false) => {
	if (gergInput) {
		return new Date(year, month - 1, day);
	} else {
		return calculateDiffFromCurrent(year, month, day);
	}
};

// from https://stackoverflow.com/questions/71222556/how-to-convert-any-of-the-5-islamic-hijri-calendars-dates-to-any-of-18-world
// export const hijriToCalendars = (year, month, day, op = {}) => {
// 	op.fromCal ??= 'islamic-umalqura'; //
// 	let gD = new Date(Date.UTC(2000, 0, 1));
// 	gD = new Date(
// 		gD.setUTCDate(
// 			gD.getUTCDate() +
// 				~~(227022 + (year + (month - 1) / 12 + day / 354) * 354.367)
// 		)
// 	);
// 	const gY = gD.getUTCFullYear(gD) - 2000,
// 		dFormat = new Intl.DateTimeFormat('en-u-ca-' + op.fromCal, {
// 			dateStyle: 'short',
// 			timeZone: 'UTC',
// 		});
// 	gD = new Date(
// 		(gY < 0 ? '-' : '+') +
// 			('00000' + Math.abs(gY)).slice(-6) +
// 			'-' +
// 			('0' + (gD.getUTCMonth(gD) + 1)).slice(-2) +
// 			'-' +
// 			('0' + gD.getUTCDate(gD)).slice(-2)
// 	);
// 	let [iM, iD, iY] = [...dFormat.format(gD).split('/')],
// 		i = 0;
// 	gD = new Date(
// 		gD.setUTCDate(
// 			gD.getUTCDate() +
// 				~~(
// 					year * 354 +
// 					month * 29.53 +
// 					day -
// 					(iY.split(' ')[0] * 354 + iM * 29.53 + iD * 1) -
// 					2
// 				)
// 		)
// 	);
// 	while (i < 4) {
// 		[iM, iD, iY] = [...dFormat.format(gD).split('/')];
// 		if (iD == day && iM == month && iY.split(' ')[0] == year)
// 			return formatOutput(gD);
// 		gD = new Date(gD.setUTCDate(gD.getUTCDate() + 1));
// 		i++;
// 	}
// 	return new Date();

// 	function formatOutput(gD) {
// 		return 'toCal' in op
// 			? ((op.calendar = op.toCal),
// 			  new Intl.DateTimeFormat((op.locale ??= 'en'), op).format(gD))
// 			: gD;
// 	}
// };
