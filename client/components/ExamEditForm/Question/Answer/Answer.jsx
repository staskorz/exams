import React from 'react'
import { FlatButton } from 'material-ui'
import { FormattedMessage } from 'react-intl'

import Checkbox from '../../../Checkbox'
import TextField from '../../../TextField'
import NumberBadge from '../../../NumberBadge'


const style = {
	answersContainer: {
		display: 'table',
	},
	
	numberContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
		position: 'relative',
		paddingRight: '8px',
	},
	
	numberBadge: {
		display: 'inline-block',
		verticalAlign: 'bottom',
	},
	
	checkboxContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	checkbox: {
		marginBottom: '12px',
		marginLeft: '8px',
	},
	
	checkboxIconError: {
		fill: 'rgb(244, 67, 54)',
	},
	
	answerTextField: {
		display: 'table-cell',
	},
	
	addRemoveAnswerButtonsContainer: {
		whiteSpace: 'nowrap',
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
}


export default ({ value, errors, onCorrectChange, onTextChange, removable, onRemove, answerIndex }) => <div
		style={ style.answersContainer }>
	<div style={ style.numberContainer }>
		<NumberBadge content={ answerIndex + 1 } primary={ true } style={ style.numberBadge } />
	</div>
	
	<div style={ style.checkboxContainer }>
		<Checkbox
				value={ !!value.correct }
				onChange={ onCorrectChange }
				style={ style.checkbox }
				iconStyle={ errors.correct ? style.checkboxIconError : null }
		/>
	</div>
	
	<TextField
			value={ value.text }
			errorText={ errors.text }
			onChange={ onTextChange }
			label={ <FormattedMessage id='answer' values={ { number: answerIndex + 1 } } /> }
			style={ style.answerTextField }
			multiLine={ true }
			rows={ 1 }
			rowsMax={ 7 }
			fullWidth
	/>
	
	<div style={ style.addRemoveAnswerButtonsContainer }>
		<FlatButton
				label={ <FormattedMessage id='remove' /> }
				secondary={ true }
				disabled={ !removable }
				onClick={ onRemove }
		/>
	</div>
</div>
