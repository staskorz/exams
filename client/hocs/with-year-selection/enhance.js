import { compose, withState, withHandlers } from 'recompose'


export default compose(
		withState('selectedTags', 'setSelectedTags', ({ year }) => (year ? [year] : [])),
		
		withHandlers({
			onSelect: ({ setSelectedTags, setYear }) => year => {
				setSelectedTags([year])
				setYear(year)
			},
			
			onDeselect: ({ setSelectedTags, setYear }) => () => {
				setSelectedTags([])
				setYear(null)
			},
			
			onClear: ({ setSelectedTags, setYear }) => () => {
				setSelectedTags([])
				setYear(null)
			},
		}),
)
