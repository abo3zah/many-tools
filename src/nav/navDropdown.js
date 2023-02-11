export const NavDropdown = ({ text, children }) => (
	<div className='dropdown'>
		<a className='dropdown-toggle' href='#'>
			{text}
		</a>
		<div className='dropdown-menu'>{children}</div>
	</div>
);
