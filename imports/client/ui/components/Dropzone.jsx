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
		height: '80px',
		width: '70px',
		transition: 'all 0.5s',
		color: 'rgba(0, 0, 0, 0.2)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	
	dropzoneActive: {
		borderColor: cyan500,
		borderStyle: 'solid',
		color: cyan500
	},
	
	dropzoneIcon: {
		height: '32px',
		width: '32px',
		color: 'inherit',
		transition: 'all 0s',
	}
};


export default ({ onDrop, style: propStyle }) => {
	return <ReactDropzone onDrop={ onDrop }
			style={{ ...style.dropzone, ...propStyle }} activeStyle={ style.dropzoneActive }>
		<AddPhotoIcon style={ style.dropzoneIcon } />
	</ReactDropzone>
};
