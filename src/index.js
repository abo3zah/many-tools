import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './nav/nav';
import { Main } from './main/main';
import { Calendar } from './calendar/calendar';
import { DateConverter } from './dateConverter/dateConverter';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className='mainPage'>
			<HashRouter>
				<Nav />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/calendar' element={<Calendar />} />
					<Route
						path='/dateConverter'
						element={<DateConverter />}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</HashRouter>
		</div>
	</React.StrictMode>
);
