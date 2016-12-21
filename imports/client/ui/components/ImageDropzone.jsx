import React, { Component } from 'react';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';

import Dropzone from './Dropzone';
import resizeImage from '/imports/client/resize-image';


const DEFAULT_SIZE = {
	width: 70,
	height: 80
};


const SIZE_FACTOR = 8;


export default class ImageDropzone extends Component {
	state = {
		image: null,
		...DEFAULT_SIZE
	};
	
	
	style = {
		dropzoneIcon: {
			height: '32px',
			width: '32px',
			color: 'inherit',
			transition: 'all 0s',
		}
	};
	
	
	normalizeDimension = (original, resized, sizeFactor) => {
		if(original > resized + sizeFactor) {
			return original;
		} else {
			return resized + sizeFactor;
		}
	};
	
	
	processImage = (src, cb) => {
		resizeImage(src, (err, result) => {
			if(err) {
				cb(err);
			} else {
				const { image, width, height } = result;
				
				this.setState({
					width: this.normalizeDimension(DEFAULT_SIZE.width, width, SIZE_FACTOR),
					height: this.normalizeDimension(DEFAULT_SIZE.height, height, SIZE_FACTOR),
					image: URL.createObjectURL(image)
				});
				
				cb(null, image);
			}
		});
	};
	
	
	handleFileDrop = (acceptedFiles, rejectedFiles) => {
		console.log('Accepted files: ', acceptedFiles);
		console.log('Rejected files: ', rejectedFiles);
		
		if(acceptedFiles && acceptedFiles.length) {
			const { onChange } = this.props;
			
			this.processImage(acceptedFiles[0], onChange);
		}
	};
	
	
	sizeToPx = () => {
		const { width, height } = this.state;
		
		return {
			width: width + 'px',
			height: height + 'px'
		};
	};
	
	
	render() {
		const pxSize = this.sizeToPx();
		
		const { image } = this.state;
		
		const { disabled } = this.props;
		
		let internalElement;
		
		if(image) {
			internalElement = <img src={ image } alt='image' />;
		} else {
			internalElement = <AddPhotoIcon style={ this.style.dropzoneIcon } />;
		}
		
		return <Dropzone onDrop={ this.handleFileDrop } style={ pxSize } disabled={ disabled }>
			{ internalElement }
		</Dropzone>;
	}
};
