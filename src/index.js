import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nav } from './nav/nav';
import { Main } from './main/main';
import { Calendar } from './calendar/calendar';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className='mainPage'>
			<HashRouter>
				<Nav />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/calendar' element={<Calendar />} />
				</Routes>
			</HashRouter>
		</div>
	</React.StrictMode>
);
