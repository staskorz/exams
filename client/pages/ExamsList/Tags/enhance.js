import { compose, withState, withHandlers, branch, renderComponent } from 'recompose'

import AddTag from './AddTag'
import RemoveTag from './RemoveTag'


export default compose(
		withState('addTagOpen', 'setAddTagOpen', false),
		withState('removeTagOpen', 'setRemoveTagOpen', false),
		
		withHandlers({
			onAddButtonClick: ({ setAddTagOpen }) => () => {
				setAddTagOpen(true)
			},
			
			onRemoveButtonClick: ({ setRemoveTagOpen }) => () => {
				setRemoveTagOpen(true)
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
			
			onRemoveTag: ({ setRemoveTagOpen, tags, onChange, examId }) => removedTag => {
				onChange(examId, tags.filter(tag => tag !== removedTag))
				
				setRemoveTagOpen(false)
			},
			
			onRemoveTagClose: ({ setRemoveTagOpen }) => () => {
				setRemoveTagOpen(false)
			},
		}),
		
		branch(({ addTagOpen }) => addTagOpen, renderComponent(AddTag)),
		branch(({ removeTagOpen }) => removeTagOpen, renderComponent(RemoveTag)),
)
