import { compose, withState, withHandlers, branch, renderComponent } from 'recompose'

import AddTag from './AddTag'


export default compose(
		withState('addTagOpen', 'setAddTagOpen', false),
		
		withHandlers({
			onAddButtonClick: ({ setAddTagOpen }) => () => {
				setAddTagOpen(true)
			},
			
			onAddTag: ({ setAddTagOpen }) => tag => {
				console.log('tag:', tag)
				
				setAddTagOpen(false)
			},
			
			onAddTagClose: ({ setAddTagOpen }) => () => {
				setAddTagOpen(false)
			},
		}),
		branch(({ addTagOpen }) => addTagOpen, renderComponent(AddTag)),
)
