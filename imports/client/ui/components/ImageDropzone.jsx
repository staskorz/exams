import React from 'react';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';

import Dropzone from './Dropzone';


const style = {
	dropzoneIcon: {
		height: '32px',
		width: '32px',
		color: 'inherit',
		transition: 'all 0s',
	}
};


export default ({ onDrop }) => <Dropzone onDrop={ onDrop } >
	<AddPhotoIcon style={ style.dropzoneIcon }/>
</Dropzone>;
