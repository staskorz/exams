import React from 'react';

import NumberBadge from './NumberBadge';
import ImageDropzone from './ImageDropzone';


const style = {
	numberBadge: {
		position: 'absolute',
		padding: '12px 0px 12px 12px',
		marginTop: '-12px'
	},
	
	badge: {
		color: 'white',
		backgroundColor: '#cccccc'
	}
};


export default ({ number, style: propStyle, onChange }) => <div style={ propStyle }>
	<NumberBadge content={ number } badgeStyle={ style.badge } style={ style.numberBadge } />
	
	<ImageDropzone onChange={ onChange } />
</div>;
