import React, { Component } from 'react'

import NumberedImageDropzone from './NumberedImageDropzone'


export default class ImagesDropzoneBlock extends Component {
	style = {
		imageDropzone: {
			display: 'inline-block',
			verticalAlign: 'top',
			margin: '16px',
		},
	}
	
	
	handleImageChange = (err, image, index) => {
		if(!err) {
			const { value, onChange } = this.props
			
			const newValue = [...value.slice(0, index), image, ...value.slice(index + 1, value.length)]
			
			onChange(newValue)
		}
	}
	
	
	handleNumberedImageChange = [0, 1, 2, 3].map(index => (err, image) => {
		this.handleImageChange(err, image, index)
	})
	
	
	handleImageRemoval = index => {
		const { value, onChange } = this.props
		
		const valueNew = [...value.slice(0, index), null, ...value.slice(index + 1, value.length)]
		
		onChange(valueNew)
	}
	
	
	handleNumberedImageRemoval = [0, 1, 2, 3].map(index => () => {
		this.handleImageRemoval(index)
	})
	
	
	render() {
		const { value } = this.props
		
		const firstNonExistingIndex = value.findIndex(elem => !elem)
		
		const isRemovable = index => value[index] && (firstNonExistingIndex - 1 === index || firstNonExistingIndex === -1 && index === 3)
		
		return <div>
			{ value.map((elem, index) => <NumberedImageDropzone key={ index } number={ index + 1 }
					onChange={ this.handleNumberedImageChange[index] } disabled={ index !== 0 && !value[index - 1] }
					style={ this.style.imageDropzone } removable={ isRemovable(index) }
					onRemove={ this.handleNumberedImageRemoval[index] } { ...value[index] || {} } />,
			) }
		</div>
	}
}
