import React from 'react';
import ReactDropzone from 'react-dropzone';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import { cyan500 } from 'material-ui/styles/colors';


const style = {
	dropzone: {
		borderWidth: '2px',
		borderColor: 'rgba(0, 0, 0, 0.2)',
		borderStyle: 'dashed',
		borderRadius: '4px',
		transition: 'all 0.5s',
		color: 'rgba(0, 0, 0, 0.2)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	
	dropzoneActive: {
		borderColor: cyan500,
		borderStyle: 'solid',
		color: cyan500
	},
	
	dropzoneDisabled: {
		color: '#eeeeee',
		borderColor: '#dddddd'
	},
	
	disabledDropzoneIcon: {
		height: '32px',
		width: '32px',
		color: 'inherit',
		transition: 'all 0s',
	}
};


export default ({ onDrop, style: propStyle, children, disabled }) => {
	if(disabled) {
		return <div style={{ ...style.dropzone, ...style.dropzoneDisabled, ...propStyle }}>
			<AddPhotoIcon style={ style.disabledDropzoneIcon } />
		</div>;
	}
	
	return <ReactDropzone onDrop={ onDrop }
			style={{ ...style.dropzone, ...propStyle }} activeStyle={ style.dropzoneActive }>
		{ children }
	</ReactDropzone>
};
