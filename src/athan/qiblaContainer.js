import { Qibla } from 'adhan';
import { useEffect, useState } from 'react';
import styles from './athan.module.css';

export const QiblaContainer = ({ coordinates, heading }) => {
	const [qibla, setQibla] = useState(Qibla(coordinates));

	useEffect(()=>{
		setQibla(Qibla(coordinates))
	},[coordinates, heading])

	return (
		<>
			<div className={styles.qiblaText}>
				{`اتجاه القبلة : ${qibla.toFixed(0)}`} &#176;
			</div>
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
				<g transform='translate(2.5 7)'>
					<g transform='translate(50, 8)'>
						<path
							d='M-18 32 l0 25 l26 0 l0 -25 l-26 0z'
							fill='black'
							stroke='black'></path>
						<path
							d='M-19 40 l0 5 l26 0 l0 -5 l-26 0z'
							fill='gold'></path>
						<path
							d='M8 32 l8 -5 l0 25 l-8 5.5z'
							fill='black'></path>
						<path
							d='M7 40 l9 -5 l0 5 l-9 5z'
							fill='gold'></path>
						<rect
							width={11}
							height={13}
							stroke='antiquewhite'
							fill='#faebd7'
							transform='rotate(-30 50 50) skewX(59)'></rect>
					</g>
					<circle
						cx={50}
						cy={50}
						r={35}
						fill='none'
						stroke='black'></circle>
					<g
						transform={`rotate(${
							heading === null ? 0 : +heading
						} 50 50)`}>
						<path
							d='M40 16 l10 -10 l10 10 q-10 -5 -20 0'
							fill='#006b3c'
							stroke='black'
							strokeWidth={1}
							transform={`rotate(${qibla} 50 50)`}></path>
						<text
							x={50}
							y={4}
							textAnchor='middle'
							fontSize={6}
							fontWeight='bold'
							transform={`rotate(${qibla} 50 50)`}>
							القبلة
						</text>
						<path
							d='M40 16 l10 -10 l10 10 q-10 -5 -20 0'
							fill='red'
							stroke='black'
							strokeWidth={1}
							transform={`rotate(0 50 50)`}></path>
						<text
							x={50}
							y={5}
							textAnchor='middle'
							fontSize={6}
							fontWeight='bold'>
							الشمال
						</text>
					</g>
				</g>
			</svg>
		</>
	);
};
