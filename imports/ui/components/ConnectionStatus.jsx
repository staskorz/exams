import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { pinkA200 } from 'material-ui/styles/colors'


const style = {
	mainContainer: {
		display: 'inline-block',
		marginRight: '20px',
		backgroundColor: pinkA200,
		color: 'white'
	},
	
	message: {
		paddingLeft: '16px'
	},
	
	buttonLabel: {
		color: 'white',
		textDecoration: 'underline'
	}
};

export default ({ connected, retryingIn, reconnect }) => {
	if(connected) {
		return <div></div>;
	} else {
		let message;
		
		if(retryingIn) {
			message = <span style={ style.message }>{ 'Retrying in ' + retryingIn + 's' }</span>;
		}
		
		return (
				<Paper style={ style.mainContainer }>
					{ message } <FlatButton label={ 'Reconnect Now' } labelStyle={ style.buttonLabel } onClick={ reconnect } />
				</Paper>
		);
	}
};
