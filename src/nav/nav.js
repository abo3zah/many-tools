import React from 'react'
import { NavBar } from './navBar';
import { NavBrand } from './navBrand';
import { SmallerScreenButton } from './smallerScreenButton';
import { NavLinks } from './navLinks';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from './navDropdown';

export const Nav = ({ menu, setMenu }) => {
	return (
		<>
			<NavBar>
				<NavBrand />
				<NavLinks>
					<NavLink to='/'>الرئيسية</NavLink>
					<NavLink to='/athan'>الأذان</NavLink>
					<NavDropdown text='التاريخ'>
						<NavLink to={'/calendar'}>التقويم</NavLink>
						<NavLink to={`/dateConverter`}>التحويل</NavLink>
					</NavDropdown>
				</NavLinks>
				<SmallerScreenButton menu={menu} setMenu={setMenu} />
			</NavBar>
		</>
	);
};
