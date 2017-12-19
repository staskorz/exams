import React, { Component } from 'react'
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo'

import Dropzone from './Dropzone'
import resizeImage from '../../imports/client/resize-image/index'
import blobToUint8array from '../util/blob-to-uint8array'
import uint8arrayToBlob from '../util/uint8array-to-blob'


const DEFAULT_SIZE = {
	width: 70,
	height: 80,
}


const SIZE_FACTOR = 8


export default class ImageDropzone extends Component {
	state = {
		image: null,
		...DEFAULT_SIZE,
	}
	
	
	style = {
		dropzoneIcon: {
			height: '32px',
			width: '32px',
			color: 'inherit',
			transition: 'all 0s',
		},
	}
	
	
	cleanupImageState = () => {
		const { image } = this.state
		
		if(image) {
			URL.revokeObjectURL(image)
		}
	}
	
	
	setImageState = ({ image, width, height }) => {
		this.cleanupImageState()
		
		if(image) {
			this.setState({
				image: URL.createObjectURL(uint8arrayToBlob(image)),
				width,
				height,
			})
		} else {
			this.setState({
				image: null,
				...DEFAULT_SIZE,
			})
		}
	}
	
	
	componentWillMount() {
		this.setImageState(this.props)
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.setImageState(nextProps)
	};
	
	
	componentWillUnmount() {
		this.cleanupImageState()
	};
	
	
	normalizeDimension = (original, resized, sizeFactor) => {
		if(original > resized + sizeFactor) {
			return original + sizeFactor
		} else {
			return resized + sizeFactor
		}
	}
	
	
	processImage = (src, cb) => {
		resizeImage(src, cb)
	}
	
	
	handleFileDrop = (acceptedFiles, rejectedFiles) => {
		if(acceptedFiles && acceptedFiles.length) {
			const { onChange } = this.props
			
			this.processImage(acceptedFiles[0], (err, imageObj) => {
				if(err) {
					onChange(err)
				} else {
					const { image, ...rest } = imageObj
					
					blobToUint8array(image, (err, uint8arr) => {
						if(err) {
							onChange(err)
						} else {
							onChange(null, {
								...rest,
								image: uint8arr,
							})
						}
					})
				}
			})
		}
	}
	
	
	sizeToPx = () => {
		const { width, height } = this.state
		
		return {
			width: this.normalizeDimension(DEFAULT_SIZE.width, width, SIZE_FACTOR) + 'px',
			height: this.normalizeDimension(DEFAULT_SIZE.height, height, SIZE_FACTOR) + 'px',
		}
	}
	
	
	render() {
		const pxSize = this.sizeToPx()
		
		const { image } = this.state
		
		const { disabled } = this.props
		
		let internalElement
		
		if(image) {
			internalElement = <img src={ image } alt='image' />
		} else {
			internalElement = <AddPhotoIcon style={ this.style.dropzoneIcon } />
		}
		
		return <Dropzone onDrop={ this.handleFileDrop } style={ pxSize } disabled={ disabled }>
			{ internalElement }
		</Dropzone>
	}
}
