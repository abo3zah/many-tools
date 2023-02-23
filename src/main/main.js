import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './main.module.css';

export const Main = () => {
	const [links] = useState([
		{ link: '/calendar', text: 'التقويم' },
		{ link: '/dateConverter', text: 'التحويل' },
	]);

	return (
		<div className={styles.containers}>
			{links.map((link) => (
				<Link key={link} to={`${link.link}`}>
					{link.text}
				</Link>
			))}
		</div>
	);
};
