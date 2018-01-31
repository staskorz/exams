const MIN_YEAR = 2016
const MAX_YEAR = 2099


export default year => {
	const type = typeof year
	
	if(type === 'number') {
		if(year % 1 !== 0) {
			return false
		}
		
		if(year < MIN_YEAR || year > MAX_YEAR) {
			return false
		}
	} else if(type === 'string') {
		if(!year.match(/^\d{4}$/)) {
			return false
		} else {
			const numericYear = parseInt(year, 10)
			
			if(numericYear < MIN_YEAR || numericYear > MAX_YEAR) {
				return false
			}
		}
	} else {
		return false
	}
	
	return true
}
