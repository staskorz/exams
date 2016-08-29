import React from 'react';
import { FlatButton } from 'material-ui';


const style = {
	mainContainer: {
		display: 'inline-block'
	}
};

export default ({ connected, retryingIn, reconnect }) => {
	if(connected) {
		return <div></div>;
	} else {
		let message;
		
		if(retryingIn) {
			message = 'Retrying in ' + retryingIn + 's';
		}
		
		return <div style={ style.mainContainer }>{ message } <FlatButton label={ 'Reconnect Now' } onClick={ reconnect } /></div>;
	}
};
