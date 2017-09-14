import React from 'react'
import { Paper } from 'material-ui'
import { FormattedMessage } from 'react-intl'

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


export default ({ number, value, onChange, style: propStyle }) => <Paper style={ { ...style, ...propStyle } }>
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
		/>
		
		<Checkbox
				label={ <FormattedMessage id='multipleChoice' /> }
				value={ value.multipleChoice }
				onChange={ onMultipleChoiceChange(onChange, value) }
		/>
		
		{ value.answers.map((answer, index) => <Answer key={ index } number={ index + 1 } value={ answer } />) }
	</div>
</Paper>
