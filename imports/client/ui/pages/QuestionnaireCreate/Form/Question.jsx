import React from 'react'
import { Paper } from 'material-ui'
import { FormattedMessage } from 'react-intl'

import replaceArrayElement from '../../../../replace-array-element'

import NumberBadge from './NumberBadge'
import TextField from './TextField'
import Checkbox from './Checkbox'
import Answer from './Answer'


const style = {
	fieldsContainer: {
		padding: '40px',
		paddingTop: '0',
	},
	
	numberBadge: {
		marginTop: '12px',
		paddingTop: '0px',
	},
}


const onQuestionBodyChange = (onChange, prev) => value => {
	onChange({
		...prev,
		text: value,
	})
}


const onMultipleChoiceChange = (onChange, prev) => value => {
	onChange({
		...prev,
		multipleChoice: value,
	})
}


const onAnswerChange = (onChange, prev, answerIndex) => value => {
	onChange({
		...prev,
		answers: replaceArrayElement(prev.answers, answerIndex, value),
	})
}


export default ({ number, value, onChange, errors, style: propStyle }) => <Paper style={ { ...style, ...propStyle } }>
	<NumberBadge number={ number } style={ style.numberBadge } secondary />
	
	<div style={ style.fieldsContainer }>
		<TextField
				label={ <FormattedMessage id='questionBody' /> }
				multiLine={ true }
				rows={ 1 }
				rowsMax={ 7 }
				fullWidth
				value={ value.text }
				onChange={ onQuestionBodyChange(onChange, value) }
				errorText={ errors.text }
		/>
		
		<Checkbox
				label={ <FormattedMessage id='multipleChoice' /> }
				value={ !!value.multipleChoice }
				onChange={ onMultipleChoiceChange(onChange, value) }
		/>
		
		{ value.answers.map((answer, index) => <Answer
				key={ index }
				number={ index + 1 }
				value={ answer }
				onChange={ onAnswerChange(onChange, value, index) }
				errors={ errors.answers[index] }
		/>) }
	</div>
</Paper>
