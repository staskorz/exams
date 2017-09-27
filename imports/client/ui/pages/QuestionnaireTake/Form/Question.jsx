import React from 'react'
import { FormattedMessage } from 'react-intl'


const style = {
	hr: {
		height: '1px',
		backgroundColor: '#cecece',
		color: '#cecece',
		border: '0 none',
		margin: 0,
	},
	
	contentContainer: {
		paddingRight: '17px',
	},
	
	questionNumber: {
		color: '#b1b1b1',
		fontSize: 'small',
	},
	
	questionBody: {
		paddingTop: '8px',
	},
}


export default ({ question: { text, multipleChoice }, number, total }) => <div>
	<hr style={ style.hr } />
	
	<div style={ style.contentContainer }>
		<div style={ style.questionNumber }>
			<FormattedMessage id='questionNumberXofY' values={ { number, of: total } } />
		</div>
		
		<div style={ style.questionBody }>
			{ text }
		</div>
	</div>
</div> 
