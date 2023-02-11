export const NavItem = ({ active, href, text }) => {
	return (
		<a className={`nav-link${active ? ' active' : ''}`} href={href}>
			{text}
		</a>
	);
};
