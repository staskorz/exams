export default (arr, key) => arr.sort((a, b) => {
	if(a[key] < b[key]) {
		return -1
	} else if(a[key] > b[key]) {
		return 1
	} else {
		return 0
	}
})
