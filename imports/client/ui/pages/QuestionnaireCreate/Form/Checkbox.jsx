import React from 'react'
import { Checkbox } from 'material-ui'


const style = {
	iconStyle: {
		marginRight: '6px',
	},
}


export default ({ onChange, value, ...props }) => <Checkbox
		{ ...props }
		checked={ value }
		onCheck={ (e, value) => onChange(value) }
		iconStyle={ style.iconStyle }
/>
