import React from 'react'

import { neutral } from '../../../colors'
import Checkbox from '../../../components/Checkbox'
import TextField from '../../../components/TextField'


const style = {
	mainContainer: {
		display: 'table',
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


export default ({ answer: { text, freeText } }) => <div style={ style.mainContainer }>
	<span style={ style.checkboxContainer }><Checkbox /></span>
	
	<span style={ style.textContainer }>{ text }</span>
	
	{ freeText ? <TextField
			name='text'
			multiLine={ true }
			rows={ 1 }
			rowsMax={ 7 }
			fullWidth
			style={ style.freeTextField }
			textareaStyle={ style.freeTextFieldTextArea }
	/> : null }
</div>
