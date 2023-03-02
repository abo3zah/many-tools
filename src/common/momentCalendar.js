import { gergMonths, weekDays, weekDaysMin } from '../common/months';

export const moment = require('moment-hijri');
moment.updateLocale('ar-sa', {
	// customizations.
	months: gergMonths,
	monthsShort: gergMonths,
	weekdays: weekDays,
	weekdaysShort: weekDaysMin,
	weekdaysMin: weekDaysMin,
	relativeTime: {
		future: 'بعد %s',
		past: 'قبل %s',
		s: 'ثانية',
		ss: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' ثانية'
				: number > 2
				? number + ' ثواني'
				: number === 2
				? 'ثانيتان'
				: 'ثانية';
		},
		m: 'دقيقة',
		mm: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' دقيقة'
				: number > 2
				? number + ' دقائق'
				: number === 2
				? 'دقيقتان'
				: 'دقيقة';
		},
		h: 'ساعة',
		hh: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' ساعة'
				: number > 2
				? number + ' ساعات'
				: number === 2
				? 'ساعتان'
				: 'ساعة';
		},
		d: 'يوم',
		dd: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' يوم'
				: number > 2
				? number + ' أيام'
				: number === 2
				? 'يومان'
				: 'يوم';
		},
		w: 'أسبوع',
		ww: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' أسبوع'
				: number > 2
				? number + ' أسابيع'
				: number === 2
				? 'أسبوعان'
				: 'أسبوع';
		},
		M: 'شهر',
		MM: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' شهر'
				: number > 2
				? number + ' أشهر'
				: number === 2
				? 'شهران'
				: 'شهر';
		},
		y: 'سنة',
		yy: function (number, withoutSuffix, key, isFuture) {
			return number > 10
				? number + ' سنة'
				: number > 2
				? number + ' سنوات'
				: number === 2
				? 'سنتان'
				: 'سنة';
		},
	},
	meridiem: function (hour, minute, isLowercase) {
		if (hour < 12) {
			return 'صباحاً';
		} else {
			return 'مساءً';
		}
	},
	calendar: {
		lastDay: '[الأمس الساعة] LT',
		sameDay: '[اليوم الساعة] LT',
		nextDay: '[غداً الساعة] LT',
		lastWeek: 'dddd [الماضي الساعة] LT',
		nextWeek: 'dddd [الساعة] LT',
		sameElse: 'L',
	},
	week: {
		dow: 0, // Sunday is the first day of the week.
		doy: 6, // The week that contains Jan 1st is the first week of the year.
	},
});
