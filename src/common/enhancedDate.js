export class EnhancedDate extends Date {
	getWeek() {
		var onejan = new Date(this.getFullYear(), 0, 1);
		return Math.ceil(
			((this - onejan) / 86400000 + onejan.getDay() + 1) / 7
		);
	}

	add(x, unit = 'd') {
		switch (unit) {
			case 'd':
				this.setDate(this.getDate() + x);
				break;
			case 'm':
				this.setMonth(this.getMonth() + x);
				break;
			case 'y':
				this.setFullYear(this.getFullYear() + x);
				break;
			case 'im':
				let days =
					this.toLocaleString('en', {
						calendar: 'islamic-umalqura',
						day: 'numeric',
					}) - 1;
				if (x > 0) {
					while (x > 0) {
						this.endOf('im').add(1);
						x--;
					}
					this.add(days);
				} else if (x < 0) {
					while (x <= 0) {
						this.startOf('im').add(-1);
						x++;
					}
					this.add(days + 1);
				}
				break;
			case 'iy':
				this.add(x * 12, 'im');
				break;

			default:
				break;
		}
		return this;
	}

	startOf(unit = 'm') {
		switch (unit) {
			case 'd':
				this.setHours(0, 0, 0, 0);
				break;
			case 'm':
				this.setDate(1);
				this.setHours(0, 0, 0, 0);
				break;
			case 'im':
				let diff =
					+this.toLocaleString('en', {
						calendar: 'islamic-umalqura',
						day: 'numeric',
					}) - 1;

				this.add(-diff);
				break;
			case 'y':
				this.setDate(1);
				this.setMonth(0);
				this.setHours(0, 0, 0, 0);
				break;
			case 'iy':
				let hijriMonth = this.toLocaleString('en', {
					calendar: 'islamic-umalqura',
					month: 'numeric',
				});

				this.startOf('im').startOf('d');
				while (hijriMonth !== '1') {
					this.add(-1).startOf('im');
					hijriMonth = this.toLocaleString('en', {
						calendar: 'islamic-umalqura',
						month: 'numeric',
					});
				}
				break;

			default:
				break;
		}
		return this;
	}

	endOf(unit = 'm') {
		switch (unit) {
			case 'd':
				this.setHours(23, 59, 59, 999);
				break;
			case 'm':
				this.startOf('m').add(1, 'm').add(-1);
				this.setHours(0, 0, 0, 0);
				break;
			case 'im':
				this.startOf('im').add(30).startOf('im').add(-1);
				break;
			case 'y':
				this.setMonth(11);
				this.setDate(31);
				this.setHours(0, 0, 0, 0);
				break;
			case 'iy':
				let hijriMonth = this.toLocaleString('en', {
					calendar: 'islamic-umalqura',
					month: 'numeric',
				});

				this.endOf('im').startOf('d');
				while (hijriMonth !== '12') {
					this.add(1).endOf('im');
					hijriMonth = this.toLocaleString('en', {
						calendar: 'islamic-umalqura',
						month: 'numeric',
					});
				}
				break;

			default:
				break;
		}
		return this;
	}

	isSame(date = new EnhancedDate()) {
		return this.valueOf() === date.valueOf();
	}

	isSameOrBefore(date = new EnhancedDate()) {
		return this.valueOf() <= date.valueOf();
	}

	isSameOrAfter(date = new EnhancedDate()) {
		return this.valueOf() >= date.valueOf();
	}

	isBefore(date = new EnhancedDate()) {
		return this.valueOf() < date.valueOf();
	}

	isAfter(date = new EnhancedDate()) {
		return this.valueOf() > date.valueOf();
	}

	format(dateString = '', lng) {
		let calendar = {
			calendar: 'gregory',
		};

		if (dateString.includes('i')) {
			calendar = {
				calendar: 'islamic-umalqura',
			};
			dateString = dateString.replace('i', '');
		}

		switch (dateString) {
			case 'YYYY':
				dateString = { year: 'numeric' };
				break;
			case 'YY':
				dateString = { year: '2-digit' };
				break;
			case 'M':
				dateString = { month: 'numeric' };
				break;
			case 'MM':
				dateString = { month: '2-digit' };
				break;
			case 'MMM':
				dateString = { month: 'short' };
				break;
			case 'MMMM':
				dateString = { month: 'long' };
				break;
			case 'D':
				dateString = { day: 'numeric' };
				break;
			case 'DD':
				dateString = { day: '2-digit' };
				break;

			case 'H':
				dateString = { hour: 'numeric' };
				break;
			case 'HH':
				dateString = { hour: '2-digit' };
				break;
			case 'H:M':
				dateString = { hour: 'numeric', minute: 'numeric' };
				break;
			case 'HH:MM':
				dateString = {
					hour: '2-digit',
					minute: '2-digit',
				};
				break;
			case 'H:M:S':
				dateString = {
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
				};
				break;
			case 'HH:MM:SS':
				dateString = {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
				};
				break;
			case 'WDD':
				dateString = { weekday: 'long' };
				break;
			case 'WD':
				dateString = { weekday: 'short' };
				break;

			default:
				dateString = {};
				break;
		}

		dateString = this.toLocaleString(lng, {
			...calendar,
			...dateString,
		})
			.replace(' AH', '')
			.replace(' هـ', '');

		return dateString;
	}

	print(str = '', lng = 'en') {
		str = str === '' ? 'MM/DD/YYYY HH:MM:SS' : str;

		let types =
			'WDD-WD-H:M:S-HH:MM:SS-H:M-HH:MM-iYYYY-iYY-iMMMM-iMMM-iMM-iM-iDD-iD-YYYY-YY-MMMM-MMM-MM-M-DD-D-HH-H'.split(
				'-'
			);

		let processing = str;
		types = types.filter((t) => {
			if (str.includes(t)) {
				str = str.replace(t, '');
				return t;
			}
		});

		types.forEach((t) => {
			processing = processing.replace(t, this.format(t, lng));
		});

		return processing;
	}

	getHijriDate(year, month = 1, day = 1) {
		let yearDiff =
			year -
			this.toLocaleString('en', {
				calendar: 'islamic-umalqura',
				year: 'numeric',
			}).split(' ')[0];

		this.add(yearDiff, 'iy');
		let monthDiff =
			month -
			this.toLocaleString('en', {
				calendar: 'islamic-umalqura',
				month: 'numeric',
			});
		this.add(monthDiff, 'im');

		let dayDiff =
			day -
			this.toLocaleString('en', {
				calendar: 'islamic-umalqura',
				day: 'numeric',
			});
		this.add(dayDiff);

		return this;
	}

	relativeDateFormat(number, select = 1) {
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
	}

	arabicAnd(years, months, days = 0, select = 1) {
		return select === 1
			? `${Math.abs(months) >= 1 && Math.abs(years) >= 1 ? 'و' : ''}`
			: `${
					Math.abs(days) >= 1 &&
					(Math.abs(years) >= 1 || Math.abs(months) >= 1)
						? 'و'
						: ''
			  }`;
	}

	findDifference(comparedDate) {
		comparedDate.setHours(0, 0, 0, 0);

		var currentYear = comparedDate.getFullYear();
		var currentMonth = comparedDate.getMonth();
		var currentDay = comparedDate.getDate();

		var year = this.getFullYear();
		var month = this.getMonth();
		var day = this.getDate();

		var differenceInYears = currentYear - year;
		var differenceInMonths = currentMonth - month;
		var differenceInDays = currentDay - day;

		if (comparedDate.valueOf() >= this.valueOf()) {
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
		if (comparedDate.valueOf() > this.valueOf()) {
			message = `قبل ${this.relativeDateFormat(
				years,
				3
			)} ${this.arabicAnd(years, months)} ${this.relativeDateFormat(
				months,
				2
			)} ${this.arabicAnd(
				years,
				months,
				days,
				2
			)} ${this.relativeDateFormat(days)}`;
		} else if (comparedDate.valueOf() < this.valueOf()) {
			message = `سيكون بعد ${this.relativeDateFormat(
				years,
				3
			)} ${this.arabicAnd(years, months)} ${this.relativeDateFormat(
				months,
				2
			)} ${this.arabicAnd(
				years,
				months,
				days,
				2
			)} ${this.relativeDateFormat(days)}`;
		}

		return message;
	}

	findHijriDifference(comparedDate) {
		comparedDate.startOf('d');

		var currentYear = +comparedDate.print('iYYYY');
		var currentMonth = +comparedDate.print('iM');
		var currentDay = +comparedDate.print('iD');

		var year = +this.print('iYYYY');
		var month = +this.print('iM');
		var day = +this.print('iD');

		var differenceInYears = currentYear - year;
		var differenceInMonths = currentMonth - month;
		var differenceInDays = currentDay - day;

		if (comparedDate.valueOf() >= this.valueOf()) {
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
		if (comparedDate.valueOf() > this.valueOf()) {
			message = `قبل ${this.relativeDateFormat(
				years,
				3
			)} ${this.arabicAnd(years, months)} ${this.relativeDateFormat(
				months,
				2
			)} ${this.arabicAnd(
				years,
				months,
				days,
				2
			)} ${this.relativeDateFormat(days)}`;
		} else if (comparedDate.valueOf() < this.valueOf()) {
			message = `سيكون بعد ${this.relativeDateFormat(
				years,
				3
			)} ${this.arabicAnd(years, months)} ${this.relativeDateFormat(
				months,
				2
			)} ${this.arabicAnd(
				years,
				months,
				days,
				2
			)} ${this.relativeDateFormat(days)}`;
		}

		return message;
	}
}
