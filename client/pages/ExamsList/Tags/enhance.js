import { compose, withState, withHandlers, branch, renderComponent } from 'recompose'

import AddTag from './AddTag'


export default compose(
		withState('addTagOpen', 'setAddTagOpen', false),
		
		withHandlers({
			onAddButtonClick: ({ setAddTagOpen }) => () => {
				setAddTagOpen(true)
			},
			
			onAddTag: ({ setAddTagOpen, tags, onChange, examId }) => tag => {
				const trimmedTag = tag.trim()
				
				if(!tags.includes(trimmedTag)) {
					onChange(examId, [...tags, trimmedTag].sort())
				}
				
				setAddTagOpen(false)
			},
			
			onAddTagClose: ({ setAddTagOpen }) => () => {
				setAddTagOpen(false)
			},
		}),
		branch(({ addTagOpen }) => addTagOpen, renderComponent(AddTag)),
)
