import React from 'react'

import { neutral } from '../../../../../../client/util/colors'
import Checkbox from '../../../../../../client/components/Checkbox'
import TextField from '../../../../../../client/components/TextField'


const style = {
	mainContainer: {
		display: 'table',
		minHeight: '48px',
	},
	
	checkboxContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
		paddingBottom: '12px',
	},
	
	textContainer: {
		display: 'table-cell',
		whiteSpace: 'nowrap',
		verticalAlign: 'bottom',
		paddingBottom: '15px',
		paddingLeft: '12px',
	},
	
	freeTextField: {
		display: 'table-cell',
		//fontWeight: 'bold',
	},
	
	freeTextFieldTextArea: {
		color: neutral,
	},
}


const onCheckedChange = (onChange, prev) => value => {
	onChange({
		...prev,
		checked: value,
	})
}


const onFreeTextChange = (onChange, prev) => value => {
	onChange({
		...prev,
		freeText: value,
	})
}


export default ({ answer: { text, freeText }, value, onChange, errors }) => <div style={ style.mainContainer }>
	<span style={ style.checkboxContainer }>
		<Checkbox value={ value.checked } onChange={ onCheckedChange(onChange, value) } />
	</span>
	
	<span style={ style.textContainer }>{ text }</span>
	
	{ freeText ? <TextField
			name='text'
			multiLine={ true }
			rows={ 1 }
			rowsMax={ 7 }
			fullWidth
			style={ style.freeTextField }
			textareaStyle={ value.checked ? style.freeTextFieldTextArea : null }
			value={ value.freeText }
			onChange={ onFreeTextChange(onChange, value) }
			disabled={ !value.checked }
			errorText={ errors.freeText }
	/> : null }
</div>
