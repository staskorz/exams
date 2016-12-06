import React from 'react';
import ReactDropzone from 'react-dropzone';
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
	}
};


export default ({ onDrop, style: propStyle, children }) => {
	return <ReactDropzone onDrop={ onDrop }
			style={{ ...style.dropzone, ...propStyle }} activeStyle={ style.dropzoneActive }>
		{ children }
	</ReactDropzone>
};
