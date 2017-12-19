import React from 'react'
import LeftArrow from 'material-ui/svg-icons/navigation/chevron-left'

import * as colors from '../../../util/colors'


const style = {
	mainContainer: {
		width: '8px',
		display: 'inline-block',
	},
	
	leftArrow: {
		color: colors.attention,
		marginBottom: '-6px',
	},
}


export default ({ show, style: propStyle }) => <span style={ style.mainContainer }>
	{ show ? <LeftArrow style={ { ...propStyle, ...style.leftArrow } } /> : null }
</span>
