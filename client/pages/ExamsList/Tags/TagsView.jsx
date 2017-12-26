import React from 'react'

import AddButton from './AddButton'
import TagList from './TagList'


export default ({ onAddButtonClick, tags }) => <span>
	<AddButton onClick={ onAddButtonClick } />
	<TagList tags={ tags } />
</span>
