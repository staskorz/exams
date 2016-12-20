import React from 'react';
import { FloatingActionButton } from 'material-ui';
import IconRemove from 'material-ui/svg-icons/content/remove';
import { pinkA200 } from 'material-ui/styles/colors';

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
		backgroundColor: '#dddddd'
	},
	
	removeButtonContainer: {
		textAlign: 'left'
	},
	
	removeButton: {
		width: '24px',
		height: '24px',
		position: 'relative',
		bottom: '14px',
		left: '11px'
	},
	
	removeButtonIcon: {
		width: '24px',
		height: '24px'
	},
	
	removeIcon: {
		width: '24px',
		height: '24px'
	}
};


export default ({ number, style: propStyle, onChange, disabled, removable }) => {
	let condProps;
	
	if(disabled) {
		condProps = { badgeStyle: style.inactiveBadge }
	} else {
		condProps = { primary: true };
	}
	
	return <div style={ propStyle }>
		<NumberBadge content={ number } style={ style.numberBadge } { ...condProps } />
		
		<ImageDropzone onChange={ onChange } disabled={ disabled } />
		
		<div style={ style.removeButtonContainer }>
			<FloatingActionButton secondary={ true } mini={ true } style={ style.removeButton }
					iconStyle={ style.removeButtonIcon } disabled={ !removable }>
				<IconRemove color={ pinkA200 } style={ style.removeIcon } />
			</FloatingActionButton>
		</div>
	</div>;
};
