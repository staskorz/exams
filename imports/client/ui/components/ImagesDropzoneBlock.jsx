import React, { Component } from 'react';

import NumberedImageDropzone from './NumberedImageDropzone';


export default class ImagesDropzoneBlock extends Component {
	state = {
		images: new Array(4)
	};
	
	
	style = {
		imageDropzone: {
			display: 'inline-block',
			verticalAlign: 'top',
			margin: '16px'
		}
	};
	
	
	handleImageChange = (err, image, index) => {
		if(!err) {
			const images = this.state.images;
			
			const imagesNew = [...images.slice(0, index), image, ...images.slice(index + 1, images.length)];
			
			this.setState({
				images: imagesNew
			});
			
			const { onChange } = this.props;
			
			onChange(imagesNew);
		}
	};
	
	
	handleNumberedImageChange = [0, 1, 2, 3].map(index => (err, image) => {
		this.handleImageChange(err, image, index);
	});
	
	
	render() {
		return <div>
			<NumberedImageDropzone number={ 1 } onChange={ this.handleNumberedImageChange[0] }
					style={ this.style.imageDropzone } />
			
			<NumberedImageDropzone number={ 2 } onChange={ this.handleNumberedImageChange[1] }
					style={ this.style.imageDropzone } />
			
			<NumberedImageDropzone number={ 3 } onChange={ this.handleNumberedImageChange[2] }
					style={ this.style.imageDropzone } />
			
			<NumberedImageDropzone number={ 4 } onChange={ this.handleNumberedImageChange[3] }
					style={ this.style.imageDropzone } />
		</div>;
	}
}
