import React from 'react';

import NumberBadge from './NumberBadge';
import ImageDropzone from './ImageDropzone';


const style = {
	numberBadge: {
		position: 'absolute',
		padding: '12px 0px 12px 12px',
		marginTop: '-12px'
	},
	
	inactiveBadge: {
		color: 'white',
		backgroundColor: '#cccccc'
	}
};


export default ({ number, style: propStyle, onChange, disabled }) => {
	let condProps;
	
	if(disabled) {
		condProps = { badgeStyle: style.inactiveBadge }
	} else {
		condProps = { primary: true };
	}
	
	return <div style={ propStyle }>
		<NumberBadge content={ number } style={ style.numberBadge } { ...condProps } />
		
		<ImageDropzone onChange={ onChange } />
	</div>;
};
