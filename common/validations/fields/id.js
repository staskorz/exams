import { length, charset } from '../../constants/id'


const regExp = new RegExp(`[^${ charset }]`)


export default id => {
	if(typeof id !== 'string') {
		return false
	}
	
	if(id.length !== length) {
		return false
	}
	
	if(id.match(regExp)) {
		return false
	}
	
	return true
}
