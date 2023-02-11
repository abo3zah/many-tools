import { NavBar } from './navBar';
import { NavBrand } from './navBrand';
import { SmallerScreenButton } from './smallerScreenButton';
import { NavLinks } from './navLinks';
import { NavItem } from './navItem';
import { NavDropdown } from './navDropdown';
import './nav.css';

export const Nav = () => {
	return (
		<>
			<NavBar>
				<NavBrand />
				<NavLinks>
					<NavItem active={true} href='/' text='الرئيسية' />
					<NavItem active={false} href='/' text='الرئيسية' />
					<NavDropdown text='الرئيسية'>
						<NavItem href='/' text='تجربة' />
						<NavItem href='/' text='تجربة' />
						<NavItem href='/' text='تجربة' />
					</NavDropdown>
				</NavLinks>
				<SmallerScreenButton />
			</NavBar>
		</>
	);
};
