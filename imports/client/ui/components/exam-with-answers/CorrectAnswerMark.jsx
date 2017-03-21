import React from 'react'
import LeftArrow from 'material-ui/svg-icons/navigation/chevron-left'

import { attention as attentionColor } from '/imports/client/ui/colors'


const style = {
	mainContainer: {
		width: '8px',
		display: 'inline-block',
	},
	
	leftArrow: {
		color: attentionColor,
		marginBottom: '-6px',
	},
}


export default ({ show, style: propStyle }) => <span style={ style.mainContainer }>
	{ show ? <LeftArrow style={{ ...propStyle, ...style.leftArrow }} /> : null }
</span>
