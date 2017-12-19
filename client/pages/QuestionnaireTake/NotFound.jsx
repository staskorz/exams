import React from 'react'
import { FormattedMessage } from 'react-intl'


const style = {
	mainContainer: {
		padding: '36px',
	},
}


export default () => <div style={ style.mainContainer }>
	<h1><FormattedMessage id='questionnaireNotExistOrNotPublished' /></h1>
</div>
