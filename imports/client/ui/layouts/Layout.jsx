import React from 'react';
import { AppBar } from 'material-ui';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import { Link, IndexLink } from 'react-router';
import { FormattedMessage } from 'react-intl';

import ConnectionStatusContainer from '/imports/client/ui/containers/ConnectionStatusContainer';


const styles = {
	appBar: {
		position: 'fixed'
	},
	
	title: {
		color: 'white',
		textDecoration: 'none'
	},
	
	titleIcon: {
		marginRight: '8px',
		marginBottom: '2px',
		verticalAlign: 'text-bottom'
	},
	
	link: {
		color: 'white',
		textDecoration: 'none',
		fontSize: '18px',
		lineHeight: '48px',
		marginRight: '20px',
	},
	
	linkActive: {
		textDecoration: 'underline'
	},
	
	placeholder: {
		height: '64px'
	},
	
	loggedInUser: {
		color: 'white',
		lineHeight: '48px',
		marginRight: '20px'
	},
	
	logo: {
		position: 'absolute',
		top: '6px',
		left: '4px'
	},
	
	logoSpacer: {
		display: 'inline-block',
		width: '175px',
		height: '1px'
	},
	
	by: {
		position: 'fixed',
		left: '5px',
		bottom: '5px',
		fontFamily: 'Roboto, sans-serif',
		fontSize: '12px',
		color: 'rgba(0, 0, 0, 0.270588)',
		pointerEvents: 'none',
		zIndex: '-1'
	}
};


export default ({ currentUser, children }) => {
	let username;
	let role;
	
	if(currentUser && currentUser.username) {
		username = currentUser.username;
	} else {
		username = '';
	}
	
	if(currentUser && currentUser.role) {
		role = currentUser.role;
	}
	
	let title;
	let menuItems;
	
	if(role === 'operator') {
		title = <Link to='/' style={ styles.title }>
			<SchoolIcon color='white' style={ styles.titleIcon } /><FormattedMessage id='exams' />
		</Link>;
		
		menuItems = <span>
			<IndexLink to='/' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='home' /></IndexLink>
			<Link to='/create-exam' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='createExam' /></Link>
			<Link to='/list-exams' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='listExams' /></Link>
			<Link to='/list-users' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='listUsers' /></Link>
			<Link to='/exam-choice' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='chooseExam' /></Link>
		</span>;
	} else {
		title = <span style={ styles.title }><SchoolIcon color='white' style={ styles.titleIcon } /><FormattedMessage id='exams' /></span>;
		
		menuItems = '';
	}
	
	return (
			<div>
				<AppBar style={ styles.appBar }
						title={ title }
						showMenuIconButton={ false }
				
						iconElementRight={
							<span>
								<ConnectionStatusContainer />
						
								{ menuItems }
						
								<span style={ styles.loggedInUser }>{ username }</span>
								
								<img style={ styles.logo } src='/company-logo.png' alt='logo' width='159px' height='54px' />
								
								<div style={ styles.logoSpacer }></div>
							</span>
						}
				/>
				
				<div style={ styles.placeholder }></div>
				
				{ children }
				
				<div style={ styles.by }>Stas Korzovsky, 2016</div>
			</div>
	)
};
