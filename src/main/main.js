import { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

export const Main = () => {
	const [links] = useState([
		{ link: 'many-tools/calendar', text: 'التقويم' },
	]);

	return (
		<div className='container'>
			{links.map((link) => (
				<Link key={link} to={`${link.link}`}>
					{link.text}
				</Link>
			))}
		</div>
	);
};
