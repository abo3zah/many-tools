export const NavDropdown = ({ text, children }) => (
	<div className='dropdown'>
		<span className='dropdown-toggle'>{text}</span>
		<div className='dropdown-menu'>{children}</div>
	</div>
);
