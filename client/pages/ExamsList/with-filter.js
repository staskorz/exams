import filter from '../../hocs/filter'

export default filter({
	prop: 'exams',
	func: (exams, filterValue) => exams.filter(({ name }) => {
		const filterValueLowercase = filterValue.toLowerCase()
		
		return name && name.toLowerCase().includes(filterValueLowercase)
	}),
})
