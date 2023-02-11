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
					<NavItem
						active={true}
						href='/many-tools'
						text='الرئيسية'
					/>
					<NavItem
						active={false}
						href='/many-tools'
						text='الرئيسية'
					/>
					<NavDropdown text='الرئيسية'>
						<NavItem href='/many-tools' text='تجربة' />
						<NavItem href='/many-tools' text='تجربة' />
						<NavItem href='/many-tools' text='تجربة' />
					</NavDropdown>
				</NavLinks>
				<SmallerScreenButton />
			</NavBar>
		</>
	);
};
