import filter from '../../hocs/filter'

export default filter({
	prop: 'questionnaires',
	func: (questionnaires, filterValue) => questionnaires.filter(({ name }) => {
		const filterValueLowercase = filterValue.toLowerCase()
		
		return name && name.toLowerCase().includes(filterValueLowercase)
	}),
})
