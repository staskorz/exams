import filter from '../../../../../client/hocs/filter'

export default filter({
	prop: 'questionnaireAnswers',
	func: (questionnaireAnswers, filterValue) => questionnaireAnswers.filter(({ hebrewName, username, employeeId }) => {
		return hebrewName && hebrewName.includes(filterValue) ||
				username && username.toLowerCase().includes(filterValue) ||
				employeeId && employeeId.includes(filterValue)
	}),
})
