import React from 'react'
import { Paper, RaisedButton } from 'material-ui'
import { FormattedMessage } from 'react-intl'

import { canGoBack } from '../../../../../client/util/browser-history-counter'


const style = {
	mainPaper: {
		padding: '32px',
	},
	
	descriptionText: {
		fontSize: '16px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
		marginRight: '16px',
		width: '200px',
		display: 'inline-block',
	},
	
	mainText: {
		fontSize: '24px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
	},
	
	actions: {
		paddingTop: '32px',
	},
	
	button: {
		marginRight: '16px',
	},
}


export default ({ exam: { name, questions }, router, start }) => <div className='main-container-padding'>
	<Paper style={ style.mainPaper }>
		<div>
			<span style={ style.descriptionText }><FormattedMessage id='examName' />:</span>
			<span style={ style.mainText }>{ name }</span>
		</div>
		
		<div>
			<span style={ style.descriptionText }><FormattedMessage id='numberOfQuestions' />:</span>
			<span style={ style.mainText }>{ questions.length }</span>
		</div>
		
		<div style={ style.actions }>
			<RaisedButton label={ <FormattedMessage id='start' /> } primary={ true } style={ style.button }
					onClick={ start } />
			{ canGoBack() ?
					<RaisedButton label={ <FormattedMessage id='cancel' /> } onClick={ () => router.goBack() } />
					
					:
					
					null
			}
		</div>
	</Paper>
</div>
