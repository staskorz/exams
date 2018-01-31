import React from 'react'

import { neutral, neutralLight } from '../../util/colors'


const style = {
	mainContainer: {
		backgroundColor: '#ffffff',
		paddingRight: '12px',
		borderBottomColor: neutralLight,
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
		position: 'fixed',
		height: '48px',
		width: '100%',
		zIndex: '800',
		cursor: 'hand',
	},
	
	locationHint: {
		color: neutral,
		fontSize: '18px',
		lineHeight: '48px',
		marginRight: '16px',
		textDecoration: 'underline',
	},
	
	verticalSpacer: {
		height: '49px',
	},
}


export default ({ currentUser: { role }, children, locationHint }) => role === 'operator' ? <div>
	<div style={ style.mainContainer }>{ children } <span style={ style.locationHint }>{ locationHint }</span></div>
	<div style={ style.verticalSpacer }></div>
</div> : null
