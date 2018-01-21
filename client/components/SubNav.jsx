import React from 'react'

import { neutralLight } from '../util/colors'


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
	},
	
	verticalSpacer: {
		height: '49px',
	},
}


export default ({ children }) => <div>
	<div style={ style.mainContainer }>{ children }</div>
	<div style={ style.verticalSpacer }></div>
</div>
