import React from 'react';
import { AppBar } from 'material-ui';
import { Link } from 'react-router';


const styles = {
	title: {
		color: 'white',
		textDecoration: 'none'
	},
	
	link: {
		color: 'white',
		textDecoration: 'none',
		fontSize: '18px',
		lineHeight: '48px',
		marginRight: '16px',
	},
	
	linkActive: {
		textDecoration: 'underline'
	}
};


export default ({ children }) => (
	<div>
		{<AppBar
			title={ <Link to='/' style={ styles.title }>Exams</Link> }
			showMenuIconButton={ false }
			iconElementRight={ <span>
				<Link to='/' style={ styles.link } activeStyle={ styles.linkActive } onlyActiveOnIndex={ true }>Home</Link>
				<Link to='/page1' style={ styles.link } activeStyle={ styles.linkActive }>Page1</Link>
			</span> }
		/>}
		
		{ children }
	</div>
);
