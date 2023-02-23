import { useState } from 'react';
import styles from './DateConverter.module.css';

//define moment module through require
const moment = require('moment-hijri');

export const UserInputGregorian = () => {
	// userInput state
	const [userInput, setUserInput] = useState('');

	return (
		<div className={styles.inputGroup}>
			<label className={styles.labels} htmlFor='userInput'>
				التاريخ الميلادي
			</label>
			<input
				className={styles.inputs}
				type='date'
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
				placeholder='أدخل التاريخ الميلادي'
			/>
		</div>
	);
};
