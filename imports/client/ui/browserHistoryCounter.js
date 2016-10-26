let factor;


export const initialize = () => {
	if(factor !== undefined) {
		if(console && console.log) {
			console.log('Already initialized');
		}
		
		return;
	}
	
	const length = history.length;
	
	if(length < 2) {
		factor = 2 - length;
	} else {
		factor = 0;
	}
};


const getLength = () => {
	if(factor === undefined) {
		if(console && console.log) {
			console.log('Initial history length was not set');
		}
	} else {
		return history.length + factor;
	}
};


export const canGoBack = () => getLength() > 2;
