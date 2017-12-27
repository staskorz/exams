import React from 'react'
import { Chip } from 'material-ui'


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


export default ({ tags, onRemoveTag }) => <span style={ style.wrapper }>{
	tags.map(tag => <Chip
			key={ tag }
			style={ style.tag }
			deleteIconStyle={ style.tagDeleteIcon }
			onRequestDelete={ () => onRemoveTag(tag) }
	>
		{ tag }
	</Chip>)
}</span>
