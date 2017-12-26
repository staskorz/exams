import React from 'react'

import { neutral } from '../../../util/colors'


const style = {
	buttonLink: {
		background: 'none',
		color: neutral,
		border: 'none',
		padding: '0',
		font: 'inherit',
		cursor: 'pointer',
		outline: 'none',
	},
}


export default ({ onClick }) => <button style={ style.buttonLink } onClick={ onClick }>+</button>
