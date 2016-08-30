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
			message = 'Retrying in ' + retryingIn + 's.';
		} else {
			message = 'Disconnected.';
		}
		
		return (
				<Paper style={ style.mainContainer }>
					<span style={ style.message }>{ message }</span>
					<FlatButton label={ 'Reconnect Now' } labelStyle={ style.buttonLabel } onClick={ reconnect } />
				</Paper>
		);
	}
};
