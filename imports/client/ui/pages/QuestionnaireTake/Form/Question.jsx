import React from 'react'
import { FormattedMessage } from 'react-intl'

import replaceArrayElement from '../../../../replace-array-element'

import Answer from './Answer'


const style = {
	mainContainer: {
		paddingBottom: '16px',
	},
	
	hr: {
		height: '1px',
		backgroundColor: '#cecece',
		color: '#cecece',
		border: '0 none',
		margin: 0,
	},
	
	contentContainer: {
		paddingRight: '17px',
		paddingLeft: '16px',
	},
	
	questionNumber: {
		marginTop: '4px',
		color: '#b1b1b1',
		fontSize: 'small',
	},
	
	questionBody: {
		paddingTop: '8px',
	},
	
	multipleChoiceNotice: {
		marginTop: '8px',
		marginBottom: '12px',
		fontSize: 'small',
		color: '#b1b1b1',
	},
	
	errorMessage: {
		height: '12px',
		fontSize: '12px',
		color: 'rgb(244, 67, 54)',
		marginRight: '4px',
		marginTop: '16px',
	},
}


const onAnswerChange = (onChange, prev, answerIndex) => value => {
	onChange(replaceArrayElement(prev, answerIndex, value))
}


export default ({ question: { text, multipleChoice, answers }, number, total, value, onChange, errors }) => <div
		style={ style.mainContainer }>
	<hr style={ style.hr } />
	
	<div style={ style.contentContainer }>
		<div style={ style.questionNumber }>
			<FormattedMessage id='questionNumberXofY' values={ { number, of: total } } />
		</div>
		
		<div style={ style.questionBody }>
			{ text }
		</div>
		
		<div style={ style.multipleChoiceNotice }>
			{ multipleChoice ? <FormattedMessage id='multipleChoiceNotice' /> : null }
		</div>
		
		{ answers.map((answer, index) => <Answer
				key={ index }
				answer={ answer }
				value={ value[index] }
				onChange={ onAnswerChange(onChange, value, index) }
				errors={ errors.answers[index] }
		/>) }
		
		<div style={ style.errorMessage }>{ errors.noneChecked ? errors.noneChecked : null }</div>
	</div>
</div> 
