import filter from '../../../hocs/filter'


export default filter({
	prop: 'examResults',
	
	func: (examResults, filterValue) => examResults.filter(({ examName }) => {
		return examName && examName.toLowerCase().includes(filterValue.toLowerCase())
	}),
})
