import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './main.module.css';

export const Main = ({ setMenu }) => {
	const [links] = useState([
		{ link: '/calendar', text: 'التقويم' },
		{ link: '/dateConverter', text: 'التحويل' },
		{ link: '/athan', text: 'الأذان' },
	]);

	return (
		<div className={styles.containers}>
			{links.map((link) => (
				<Link
					key={link}
					to={`${link.link}`}
					onClick={() => setMenu(false)}>
					{link.text}
				</Link>
			))}
		</div>
	);
};
