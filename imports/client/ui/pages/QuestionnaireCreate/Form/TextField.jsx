import React from 'react'
import { TextField } from 'material-ui'

export default ({ onChange, label, ...props }) => <TextField
		{ ...props }
		floatingLabelText={ label }
		onChange={ (e, value) => onChange(value) }
/>
