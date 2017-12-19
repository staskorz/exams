import React from 'react'
import { Paper } from 'material-ui'
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
}


export default () => <div className='main-container-padding'>
	<Paper style={ style.mainPaper }>
		<div>
			<span style={ style.mainText }><FormattedMessage id='userUnknown' /></span>
		</div>
	</Paper>
</div>
