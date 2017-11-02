export default (arr, key) => arr.filter(
		(elem, index, arr) => !arr[index + 1] || arr[index][key] !== arr[index + 1][key],
)
