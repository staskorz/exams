import React from 'react'
import { FormattedMessage } from 'react-intl'
import { FlatButton } from 'material-ui'

import NumberBadge from './NumberBadge'
import TextField from '../TextField'
import Checkbox from '../Checkbox'


const style = {
	mainContainer: {
		display: 'table',
	},
	
	numberBadgeContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	numberBadge: {
		verticalAlign: 'bottom',
	},
	
	spacer: {
		width: '16px',
		display: 'inline-block',
	},
	
	answerBody: {
		display: 'table-cell',
		marginLeft: '16px',
	},
	
	freeTextCheckboxContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	freeTextCheckbox: {
		whiteSpace: 'nowrap',
		verticalAlign: 'bottom',
		marginLeft: '16px',
		marginBottom: '8px',
	},
	
	removeButtonContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	removeButton: {
		verticalAlign: 'bottom',
		marginBottom: '4px',
	},
}


const onAnswerBodyChange = (onChange, prev) => value => {
	onChange({
		...prev,
		text: value,
	})
}


const onFreeTextChange = (onChange, prev) => value => {
	onChange({
		...prev,
		freeText: value,
	})
}


export default ({ number, value, onChange, onRemove, canRemove, errors }) => <div style={ style.mainContainer }>
	<div style={ style.numberBadgeContainer }>
		<NumberBadge number={ number } primary style={ style.numberBadge } />
	</div>
	
	<span style={ style.spacer }>&nbsp;</span>
	
	<TextField
			label={ <FormattedMessage id='answer' values={ { number } } /> }
			multiLine={ true }
			rows={ 1 }
			rowsMax={ 7 }
			fullWidth
			style={ style.answerBody }
			value={ value.text }
			onChange={ onAnswerBodyChange(onChange, value) }
			errorText={ errors.text }
	/>
	
	<div style={ style.freeTextCheckboxContainer }>
		<Checkbox
				label={ <FormattedMessage id='freeText' /> }
				style={ style.freeTextCheckbox }
				value={ !!value.freeText }
				onChange={ onFreeTextChange(onChange, value) }
		/>
	</div>
	
	<div style={ style.removeButtonContainer }>
		<FlatButton
				label={ <FormattedMessage id='remove' /> }
				style={ style.removeButton }
				onClick={ onRemove }
				disabled={ canRemove }
		/>
	</div>
</div>
