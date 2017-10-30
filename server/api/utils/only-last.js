/*
for(let i = 0; i < allExamResultsLength; i++) {
	if(!allExamResults[i + 1] || allExamResults[i].examineeUserId !== allExamResults[i + 1].examineeUserId) {
		examResults.push(allExamResults[i])
	}
}
*/

export default (arr, key) => arr.reduce(
		(acc, elem, index, arr) => !arr[index + 1] || arr[index][key] !== arr[index + 1][key] ? [...acc, elem] : acc,
		[],
)
