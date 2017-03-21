import React from 'react'
import { Badge } from 'material-ui'

import Checkbox from './Checkbox'
import CorrectAnswerMark from './CorrectAnswerMark'
import { primary as primaryColor } from '/imports/client/ui/colors'


const style = {
	mainContainer: {
		marginTop: '16px',
	},
	
	badge: {
		padding: 0,
		paddingRight: '44px',
		top: '-18px',
	},
	
	checkbox: {
		marginBottom: '-6px',
		marginRight: '8px',
		marginLeft: '8px',
	},
	
	text: {
		color: primaryColor,
		display: 'inline-block',
	},
}


export default ({ number, text, correct, userChecked, correctChecked }) => <div style={ style.mainContainer }>
	<Badge badgeContent={ number } primary style={ style.badge } />
	<CorrectAnswerMark show={ !correct && correctChecked } />
	<Checkbox checked={ userChecked } style={ style.checkbox } />
	<span style={ style.text }>{ text }</span>
</div>
