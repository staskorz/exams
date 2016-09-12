import React from 'react';
import { AppBar } from 'material-ui';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import { Link, IndexLink } from 'react-router';
import { FormattedMessage } from 'react-intl';

import ConnectionStatusContainer from '/imports/ui/containers/ConnectionStatusContainer';


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
		marginRight: '16px',
	},
	
	linkActive: {
		textDecoration: 'underline'
	},
	
	placeholder: {
		height: '64px'
	}
};


export default ({ children }) => (
	<div>
		<AppBar
			title={ <Link to='/' style={ styles.title }>
				<SchoolIcon color='white' style={ styles.titleIcon } /><FormattedMessage id='exams' />
			</Link> }
			showMenuIconButton={ false }
			iconElementRight={ <span>
				<ConnectionStatusContainer />
				<IndexLink to='/' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='home' /></IndexLink>
				<Link to='/page1' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='page1' /></Link>
				<Link to='/create-exam' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='createExam' /></Link>
				<Link to='/list-exams' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='listExams' /></Link>
				<Link to='/exam-choice' style={ styles.link } activeStyle={ styles.linkActive }><FormattedMessage id='chooseExam' /></Link>
			</span> }
			style={ styles.appBar }
		/>
		
		<div style={ styles.placeholder }>
			
		</div>
		
		{ children }
	</div>
);
