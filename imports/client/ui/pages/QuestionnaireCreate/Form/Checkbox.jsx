import React from 'react'
import { Checkbox } from 'material-ui'

export default ({ onChange, value, ...props }) => <Checkbox
		{ ...props }
		checked={ value }
		onCheck={ (e, value) => onChange(value) }
/>
