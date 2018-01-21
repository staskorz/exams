import React from 'react'

import LinkButton from './LinkButton'
import TagList from './TagList'


export default ({ onAddButtonClick, onRemoveButtonClick, tags }) => <span>
	<LinkButton onClick={ onAddButtonClick } label='+' />
	<TagList tags={ tags } />
	{ tags.length && <span>&nbsp;<LinkButton onClick={ onRemoveButtonClick } label='-' /></span> || null }
</span>
