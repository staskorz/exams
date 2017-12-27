import React from 'react'

import LinkButton from './LinkButton'
import TagList from './TagList'


export default ({ onAddButtonClick, tags }) => <span>
	<LinkButton onClick={ onAddButtonClick } label='+' />
	<TagList tags={ tags } />
</span>
