const FIRST_YEAR = 2016


export default currentYear => {
	const years = []
	
	for(let year = FIRST_YEAR; year <= currentYear; year++) {
		years.push(year)
	}
	
	return years
}
