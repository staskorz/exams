import React from 'react'
import { FormattedMessage } from 'react-intl'

import NumberBadge from './NumberBadge'
import TextField from './TextField'
import Checkbox from './Checkbox'


const style = {
	mainContainer: {
		display: 'table',
	},
	
	numberBadgeContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	numberBadge: {
		verticalAlign: 'bottom',
	},
	
	spacer: {
		width: '8px',
		display: 'table-cell',
	},
	
	answerBody: {
		display: 'table-cell',
	},
}


export default ({ number, value, onChange }) => <div style={ style.mainContainer }>
	<div style={ style.numberBadgeContainer }>
		<NumberBadge number={ number } primary style={ style.numberBadge } />
	</div>
	
	<span style={ style.spacer }>&nbsp;</span>
	
	<TextField
			label={ <FormattedMessage id='answer' values={ { number } } /> }
			multiLine={ true }
			rows={ 1 }
			rowsMax={ 7 }
			fullWidth
			style={ style.answerBody }
	/>
</div>
