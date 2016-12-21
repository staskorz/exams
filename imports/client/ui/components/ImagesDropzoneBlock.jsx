import React, { Component } from 'react';

import NumberedImageDropzone from './NumberedImageDropzone';


export default class ImagesDropzoneBlock extends Component {
	state = {
		images: (new Array(4)).fill(null)
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
		const { images } = this.state;
		
		const firstNonExistingIndex = images.findIndex(elem => !elem);
		
		const isRemovable = index => images[index] && (firstNonExistingIndex - 1 === index || firstNonExistingIndex === -1 && index === 3);
		
		return <div>
			{ images.map((elem, index) => <NumberedImageDropzone key={ index } number={ index + 1 }
					onChange={ this.handleNumberedImageChange[index] } disabled={ index !== 0 && !images[index - 1] }
					style={ this.style.imageDropzone } removable={ isRemovable(index) } />
			) }
		</div>;
	}
}
