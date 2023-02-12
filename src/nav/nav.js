import { NavBar } from './navBar';
import { NavBrand } from './navBrand';
import { SmallerScreenButton } from './smallerScreenButton';
import { NavLinks } from './navLinks';
import { Link } from 'react-router-dom';
import { NavDropdown } from './navDropdown';
import './nav.css';

export const Nav = () => {
	return (
		<>
			<NavBar>
				<NavBrand />
				<NavLinks>
					<Link to={`/`}>الرئيسية</Link>
					<Link to={`/many-tools/calendar`}>التقويم</Link>
					<NavDropdown text='أخرى'>
						<Link to={`/`}>الرئيسية</Link>
						<Link to={`/many-tools/calendar`}>التقويم</Link>
					</NavDropdown>
				</NavLinks>
				<SmallerScreenButton />
			</NavBar>
		</>
	);
};
