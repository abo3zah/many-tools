import styles from './DateConverter.module.css';
import { english2arabic } from '../common/english2arabic';
import { EnhancedDate } from '../common/enhancedDate';

export const DateToDate = ({ selectedDate, gergInput }) => {
	return (
		<ul className={styles.output}>
			<li>
				<b>التاريخ {gergInput ? 'الهجري' : 'الميلادي'} هو </b>
				{selectedDate.print(
					gergInput
						? 'WDD iD - iMMM - iYYYY هـ'
						: 'WDD D - MMM - YYYY م',
					'ar-SA'
				)}
			</li>
			<li>
				<b>هذا التاريخ</b>{' '}
				{english2arabic(
					gergInput
						? selectedDate.findDifference(new EnhancedDate())
						: selectedDate.findHijriDifference(
								new EnhancedDate()
						  )
				)}
				{gergInput ? ' بالميلادي' : ' بالهجري'}
			</li>
		</ul>
	);
};
