import React from 'react';
import { CircularProgress } from 'material-ui';


const style = {
	margin: 'auto',
	position: 'absolute',
	top: 0,
	left: 0,
	bottom: 0,
	right: 0
};


export default () => (
		<CircularProgress size={ 1.5 } style={ style } />
);
