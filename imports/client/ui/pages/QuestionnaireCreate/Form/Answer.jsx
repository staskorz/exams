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
		width: '16px',
		display: 'inline-block',
	},
	
	answerBody: {
		display: 'table-cell',
		marginLeft: '16px',
	},
	
	freeTextCheckboxContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	freeTextCheckbox: {
		whiteSpace: 'nowrap',
		verticalAlign: 'bottom',
		marginLeft: '16px',
		marginBottom: '8px',
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
	
	<div style={ style.freeTextCheckboxContainer }>
		<Checkbox label={ <FormattedMessage id='freeText' /> } style={ style.freeTextCheckbox } />
	</div>
</div>
