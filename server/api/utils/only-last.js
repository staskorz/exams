export default (arr, key) => arr.reduce(
		(acc, elem, index, arr) => !arr[index + 1] || arr[index][key] !== arr[index + 1][key] ? [...acc, elem] : acc,
		[],
)
