import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Nav } from './nav/nav';
import { Main } from './main/main';
import { Calendar } from './calendar/calendar';
import { DateConverter } from './dateConverter/dateConverter';
import { useState } from 'react';

export const App = () => {
	const [menu, setMenu] = useState(false);

	return (
		<div className='mainPage'>
			<HashRouter>
				<Nav menu={menu} setMenu={setMenu} />
				{menu === true ? (
					<Main setMenu={setMenu} />
				) : (
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/calendar' element={<Calendar />} />
						<Route
							path='/dateConverter'
							element={<DateConverter />}
						/>
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				)}
			</HashRouter>
		</div>
	);
};
