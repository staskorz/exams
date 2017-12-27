import { compose, withHandlers } from 'recompose'

import withAvailableTags from '../../with-available-tags'


export default compose(
		withAvailableTags,
		
		withHandlers({
			onSelect: ({ selectedTags, setSelectedTags }) => selectedTag => {
				if(!selectedTags.includes(selectedTag)) {
					setSelectedTags([...selectedTags, selectedTag])
				}
			},
			
			onDeselect: ({ selectedTags, setSelectedTags }) => deselectedTag => {
				setSelectedTags(selectedTags.filter(tag => tag !== deselectedTag))
			},
		}),
)
