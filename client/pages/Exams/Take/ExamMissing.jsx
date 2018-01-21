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


export default ({ history }) => <div className='main-container-padding'>
	<Paper style={ style.mainPaper }>
		<div>
			<span style={ style.mainText }><FormattedMessage id='examMissing' /></span>
		</div>
		
		<div style={ style.actions }>
			<RaisedButton label={ <FormattedMessage id='exit' /> } primary={ true } onClick={ () => history.goBack() } />
		</div>
	</Paper>
</div>
