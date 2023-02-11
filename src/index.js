import React from 'react';
import ReactDOM from 'react-dom/client';
import { Homepage } from './homepage/homepage';
import './index.css';
import { Nav } from './nav/nav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className='mainPage'>
			<Nav />
			<Homepage />
		</div>
	</React.StrictMode>
);
