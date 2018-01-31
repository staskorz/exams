import React from 'react'
import { FormattedMessage } from 'react-intl'


const style = {
	mainContainer: {
		marginRight: '33px',
	},
	
	text: {
		fontSize: '24px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
	},
}


export default () => <div style={ style.mainContainer }>
	<span style={ style.text }><FormattedMessage id={ 'noSuitableRecords' } /></span>
</div>
