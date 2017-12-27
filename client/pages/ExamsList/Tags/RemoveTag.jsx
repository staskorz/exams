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
}


export default ({ tags }) => <span style={ style.wrapper }>{
	tags.map((tag, index) => <Chip key={ index } style={ style.tag }>{ tag }</Chip>)
}</span>
