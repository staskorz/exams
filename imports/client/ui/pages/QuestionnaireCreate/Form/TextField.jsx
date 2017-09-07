import React from 'react'
import { TextField } from 'material-ui'

export default ({ onChange, ...props }) => <TextField { ...props } onChange={ (e, value) => onChange(value) } />
