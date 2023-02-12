import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nav } from './nav/nav';
import { Main } from './main/main';
import { Calendar } from './calendar/calendar';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<div className='mainPage'>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route
						path='/many-tools/calendar'
						element={<Calendar />}
					/>
					<Route path='*' element={<Main />} />
				</Routes>
			</BrowserRouter>
		</div>
	</React.StrictMode>
);
