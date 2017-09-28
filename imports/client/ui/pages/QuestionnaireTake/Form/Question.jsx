import React from 'react'
import { FormattedMessage } from 'react-intl'

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
}


export default ({ question: { text, multipleChoice, answers }, number, total }) => <div style={ style.mainContainer }>
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
		/>) }
	</div>
</div> 
