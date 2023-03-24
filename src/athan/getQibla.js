import { Qibla } from 'adhan';
import { useState } from 'react';
import kaabah from '../img/pre_wm_8kT.webp';

export const GetQibla = ({ coordinates }) => {
	const [qibla] = useState(Qibla(coordinates));

	return (
		<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
			<mask id='myMask'>
				<rect
					x='0'
					y='0'
					width={100}
					height={100}
					fill={'black'}
					rx={50}
				/>
				<circle cx={50} cy={50} r={35} fill='white'></circle>
			</mask>
			<image
				href={kaabah}
				width={100}
				height={100}
				mask='url(#myMask)'
			/>
			<circle
				cx={50}
				cy={50}
				r={35}
				fill='none'
				stroke='black'></circle>
			<path
				d='M40 16 l10 -10 l10 10 q-10 -5 -20 0'
				fill='gold'
				stroke='black'
				strokeWidth={1}
				transform={`rotate(${qibla} 50 50)`}></path>
		</svg>
	);
};
