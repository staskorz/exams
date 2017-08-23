import React from 'react'
import { TextField, IconButton } from 'material-ui'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import { FormattedMessage } from 'react-intl'


const style = {
	textField: {
		marginLeft: '34px',
	},
	
	clearIcon: {
		padding: '0',
		top: '10px',
	},
}


export default ({ value, onChange }) => {
	const simplifiedOnChange = (event, value) => onChange(value)
	
	const clear = () => {
		onChange('')
	}
	
	return <span>
		<TextField
				style={ style.textField }
				hintText={ <FormattedMessage id='filter' /> }
				value={ value }
				onChange={ simplifiedOnChange }
		/>
		
		<IconButton style={ style.clearIcon } disabled={ value.trim() === '' } onClick={ clear }>
			<ClearIcon />
		</IconButton>
	</span>
}
