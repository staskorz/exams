import { compose, withProps, withState } from 'recompose'


export default compose(
		withState('selectedTags', 'setSelectedTags', []),
		
		withProps(({ selectedTags, availableTags }) => ({
			selectedTags: selectedTags.filter(tag => availableTags.includes(tag)),
		})),
		
		withProps(({ exams, selectedTags }) => {
			if(selectedTags.length) {
				return {
					exams: exams.filter(({ tags }) => selectedTags.every(tag => tags.includes(tag))),
				}
			} else {
				return {
					exams,
				}
			}
		}),
)
