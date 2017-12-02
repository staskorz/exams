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
}


export default ({ router }) => <div className='main-container-padding'>
	<Paper style={ this.style.mainPaper }>
		<div>
			<span style={ this.style.mainText }><FormattedMessage id='examMissing' /></span>
		</div>
		
		<div style={ this.style.actions }>
			<RaisedButton label={ <FormattedMessage id='exit' /> } primary={ true } onClick={ () => router.goBack() } />
		</div>
	</Paper>
</div>
