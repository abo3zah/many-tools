export const EmptySpan = ({ dayNumForStartMonth }) =>
	// to generate array of daysInMonth length and fill it with empty strings
	Array.from({ length: dayNumForStartMonth }, () => '').map((_, index) => (
		<span key={'empty' + index}>&nbsp;</span>
	));
