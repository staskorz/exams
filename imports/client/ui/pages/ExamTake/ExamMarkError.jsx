import React from 'react'
import { Paper, RaisedButton } from 'material-ui'
import { FormattedMessage } from 'react-intl'


const style = {
	mainPaper: {
		padding: '32px',
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


export default ({ router, onSave }) => <div className='main-container-padding'>
	<Paper style={ style.mainPaper }>
		<div>
			<span style={ style.mainText }><FormattedMessage id='examMarkError' /></span>
		</div>
		
		<div style={ style.actions }>
			<RaisedButton label={ <FormattedMessage id='exit' /> } style={ style.button } onClick={ () => router.goBack() } />
			
			<RaisedButton label={ <FormattedMessage id='tryAgain' /> } style={ style.button } primary={ true } onClick={ onSave } />
		</div>
	</Paper>
</div>
