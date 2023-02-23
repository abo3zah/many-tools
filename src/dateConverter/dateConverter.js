import styles from './DateConverter.module.css';
import { UserInputGregorian } from './userInputGregorian';
import { UserInputHijri } from './userInputHijri';

export const DateConverter = () => {
	return (
		<div className={styles.container}>
			<UserInputGregorian />
			<UserInputHijri />
		</div>
	);
};
