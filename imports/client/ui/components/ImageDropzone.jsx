import React, { Component } from 'react';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';

import Dropzone from './Dropzone';


export default class ImageDropzone extends Component {
	style = {
		defaultSize: {
			height: '80px',
			width: '70px',
		},
		
		dropzoneIcon: {
			height: '32px',
			width: '32px',
			color: 'inherit',
			transition: 'all 0s',
		}
	};
	
	
	render() {
		const { onDrop } = this.props;
		
		return <Dropzone onDrop={ onDrop } style={ this.style.defaultSize } >
			<AddPhotoIcon style={ this.style.dropzoneIcon }/>
		</Dropzone>;
	}
};
