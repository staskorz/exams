import React from 'react'
import { Chip, IconButton } from 'material-ui'
import ClearIcon from 'material-ui/svg-icons/content/clear'

import { neutral } from '../util/colors'


const style = {
	mainContainer: {
		display: 'inline-flex',
		marginRight: '33px',
		marginBottom: '4px',
	},
	
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	
	tag: {
		marginRight: '4px',
		marginBottom: '4px',
		height: '32px',
	},
	
	tagSelected: {
		marginRight: '4px',
		height: '32px',
		backgroundColor: neutral,
	},
	
	tagDeleteIcon: {
		marginLeft: '-8px',
		marginRight: '4px',
	},
	
	clearIcon: {
		padding: '0',
		top: '-8px',
		marginLeft: '-12px',
	},
}


export default ({ availableTags, selectedTags, onSelect, onDeselect, onClear }) => <div
		style={ style.mainContainer }>
	<div style={ style.wrapper }>{
		availableTags.map(tag => <Chip
				key={ tag }
				style={ selectedTags.includes(tag) ? style.tagSelected : style.tag }
				deleteIconStyle={ style.tagDeleteIcon }
				onClick={ () => onSelect(tag) }
				onRequestDelete={ selectedTags.includes(tag) ? () => onDeselect(tag) : null }
		>
			{ tag }
		</Chip>)
	}</div>
	
	<IconButton style={ style.clearIcon } disabled={ !selectedTags.length } onClick={ onClear }>
		<ClearIcon />
	</IconButton>
</div>
