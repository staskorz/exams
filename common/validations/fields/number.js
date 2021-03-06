const regExp = new RegExp(`[^0-9]`)


export default number => {
	if(typeof number === 'number') {
		return true
	}
	
	if(typeof number === 'string') {
		return !number.match(regExp)
	}
	
	return false
}
