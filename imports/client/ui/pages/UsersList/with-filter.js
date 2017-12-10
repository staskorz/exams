import filter from '../../hocs/filter'

export default filter({
	prop: 'users',
	func: (users, filterValue) => users.filter(({ hebrewName, username, employeeId }) => {
		return hebrewName && hebrewName.includes(filterValue) ||
				username && username.toLowerCase().includes(filterValue) ||
				employeeId && employeeId.includes(filterValue)
	}),
})
