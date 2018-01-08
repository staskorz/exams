import React from 'react'
import { Toggle } from 'material-ui'


export default ({ value, onChange, label }) => <Toggle
		toggled={ !!value }
		onToggle={ (_, value) => onChange(value) }
		label={ label }
		labelPosition={ 'right' }
/>
