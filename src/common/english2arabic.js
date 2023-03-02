export const english2arabic = (s) =>
	String(s).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
