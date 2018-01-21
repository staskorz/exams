import React from 'react'
import { NavLink } from 'react-router-dom'
import { neutral } from '../util/colors'


const style = {
	link: {
		color: neutral,
		textDecoration: 'none',
		fontSize: '18px',
		lineHeight: '48px',
		marginRight: '20px',
	},
	
	linkActive: {
		textDecoration: 'underline',
	},
}


export default ({ to, label }) => <NavLink to={ to } style={ style.link } activeStyle={ style.linkActive }>{ label }</NavLink>
