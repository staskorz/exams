import React, { Component } from 'react'
import { cyan500 } from 'material-ui/styles/colors'

import uint8arrayToBlob from '../util/uint8array-to-blob'
import NumberBadge from './NumberBadge'


export default class NumberedImage extends Component {
	state = {
		image: null,
	}
	
	
	style = {
		imageContainer: {
			display: 'inline-block',
			verticalAlign: 'top',
			margin: '16px',
			borderWidth: '2px',
			borderColor: cyan500,
			borderStyle: 'solid',
			borderRadius: '4px',
			padding: '3px',
		},
		
		numberBadge: {
			position: 'absolute',
			padding: '12px 0px 12px 7px',
			marginTop: '-20px',
		},
	}
	
	
	cleanupImageState = () => {
		const { image } = this.state
		
		if(image) {
			URL.revokeObjectURL(image)
		}
	}
	
	
	setImageState = ({ image }) => {
		this.cleanupImageState()
		
		if(image) {
			this.setState({
				image: URL.createObjectURL(uint8arrayToBlob(image)),
			})
		} else {
			this.setState({
				image: null,
			})
		}
	}
	
	
	componentWillMount() {
		this.setImageState(this.props)
	}
	
	
	componentWillReceiveProps(nextProps) {
		this.setImageState(nextProps)
	}
	
	
	componentWillUnmount() {
		this.cleanupImageState()
	}
	
	
	render() {
		const { image } = this.state
		const { number } = this.props
		
		return <div style={ this.style.imageContainer }>
			<NumberBadge content={ number } primary={ true } style={ this.style.numberBadge } />
			
			<img src={ image } alt={ 'image' + number } />
		</div>
	}
}
