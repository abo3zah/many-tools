import styles from './DateConverter.module.css';
import { UserInput } from './userInput';

export const DateConverter = () => {
	return (
		<div className={styles.container}>
			<UserInput gergInput={true} />
			<UserInput gergInput={false} />
		</div>
	);
};
