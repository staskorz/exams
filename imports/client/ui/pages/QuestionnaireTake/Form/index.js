import React from 'react'
import { onlyUpdateForKeys } from 'recompose'
import { FormattedMessage } from 'react-intl'
import { RaisedButton } from 'material-ui'

import replaceArrayElement from '../../../../../../client/util/replace-array-element'
import ConfirmedRaisedButton from '../../../components/ConfirmedRaisedButton'

import Question from './Question'

const PureQuestion = onlyUpdateForKeys(['value'])(Question)


const style = {
	form: {
		backgroundColor: 'white',
	},
	
	title: {
		margin: '0',
	},
	
	description: {
		marginRight: '17px',
		marginBottom: '32px',
		fontFamily: 'Roboto, sans-serif',
		wordWrap: 'break-word',
		whiteSpace: 'pre-wrap',
	},
	
	buttonsContainer: {
		marginRight: '20px',
	},
	
	button: {
		marginTop: '32px',
	},
	
	formHasErrorsMessage: {
		height: '24px',
		marginTop: '6px',
		marginRight: '20px',
		fontFamily: 'Roboto, sans-serif',
		fontSize: '12px',
		lineHeight: '12px',
		color: 'rgb(244, 67, 54)',
	},
}


const onQuestionChange = (setValue, questionIndex) => value => {
	setValue(prev => replaceArrayElement(prev, questionIndex, value))
}


export default ({
					questionnaire: { name, description, questions },
					value, setValue, errors, errorsDetected, onSave,
					intl: { formatMessage },
				}) => <form
		style={ style.form }
>
	<h1 style={ style.title }>{ name }</h1>
	
	<pre style={ style.description }>{ description }</pre>
	
	{ questions.map((question, index) => <PureQuestion
			key={ index }
			question={ question }
			number={ index + 1 }
			total={ questions.length }
			value={ value[index] }
			onChange={ onQuestionChange(setValue, index) }
			errors={ errors[index] }
	/>) }
	
	<div style={ style.buttonsContainer }>
		<ConfirmedRaisedButton
				style={ style.button }
				primary={ true }
				text={ formatMessage({ id: 'areYouSure' }) }
				label={ <FormattedMessage id='submit' /> }
				onConfirm={ onSave }
				disabled={ errorsDetected }
		/>
	</div>
	
	<div style={ style.formHasErrorsMessage }>
		{ errorsDetected ? <FormattedMessage id='formHasErrors' /> : ' ' }
	</div>
</form>
