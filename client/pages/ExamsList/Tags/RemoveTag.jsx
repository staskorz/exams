import React from 'react'
import { Chip } from 'material-ui'

import LinkButton from './LinkButton'


const style = {
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	
	tag: {
		marginRight: '4px',
	},
	
	tagDeleteIcon: {
		marginLeft: '-8px',
		marginRight: '4px',
	},
}


export default ({ tags, onRemoveTag, onRemoveTagClose }) => <span style={ style.wrapper }>{
	tags.map(tag => <Chip
			key={ tag }
			style={ style.tag }
			deleteIconStyle={ style.tagDeleteIcon }
			onRequestDelete={ () => onRemoveTag(tag) }
	>
		{ tag }
	</Chip>)
}<LinkButton label='&times;' onClick={ onRemoveTagClose } /></span>
