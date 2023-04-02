import styles from './DateConverter.module.css';
import { useEffect, useState } from 'react';
import { moment } from '../common/momentCalendar';
import { english2arabic } from '../common/english2arabic';
import {
	getFullDate,
	findDateDifference,
} from '../common/dateOptionsFunctions';

export const DateToDate = ({ selectedDate, gergInput }) => {
	return (
		<ul className={styles.output}>
			<li>
				<b>التاريخ {gergInput ? 'الهجري' : 'الميلادي'} هو </b>
				{english2arabic(getFullDate(selectedDate, !gergInput))}
			</li>
			<li>
				<b>هذا التاريخ</b> {english2arabic(findDateDifference(selectedDate))} بالميلادي
			</li>
		</ul>
	);
};
