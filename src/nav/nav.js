import { NavBar } from './navBar';
import { NavBrand } from './navBrand';
import { SmallerScreenButton } from './smallerScreenButton';
import { NavLinks } from './navLinks';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from './navDropdown';
import './nav.css';

export const Nav = () => {
	return (
		<>
			<NavBar>
				<NavBrand />
				<NavLinks>
					<NavLink to='/'>الرئيسية</NavLink>
					<NavLink to='/calendar'>التقويم</NavLink>
					<NavDropdown text='أخرى'>
						<NavLink to={`/`}>الرئيسية</NavLink>
						<NavLink to={`/calendar`}>التقويم</NavLink>
					</NavDropdown>
				</NavLinks>
				<SmallerScreenButton />
			</NavBar>
		</>
	);
};
