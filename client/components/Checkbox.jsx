import React from 'react'
import { Checkbox } from 'material-ui'


const style = {
	checkbox: {
		marginLeft: '12px',
		//marginRight: '8px',
		marginBottom: '12px',
		whiteSpace: 'nowrap',
	},
	
	labelStyle: {
		marginLeft: '-8px',
	},
}


export default ({ onChange, value, ...props }) => <Checkbox
		{ ...props }
		checked={ value }
		onCheck={ (e, value) => onChange(value) }
		style={ style.checkbox }
		labelStyle={ style.labelStyle }
/>
