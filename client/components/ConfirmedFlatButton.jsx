import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatButton } from 'material-ui'

import ConfirmationDialog from './ConfirmationDialog'


export default class ConfirmedFlatButton extends Component {
	static propTypes = {
		onConfirm: PropTypes.func.isRequired,
	}
	
	
	state = {
		open: false,
	}
	
	
	style = {
		mainContainer: {
			display: 'inline-block',
		},
	}
	
	
	openDialog = () => {
		this.setState({
			open: true,
		})
	}
	
	
	closeDialog = () => {
		this.setState({
			open: false,
		})
	}
	
	
	handleFloatingButtonClick = () => {
		this.openDialog()
	}
	
	
	handleYesButtonClick = () => {
		this.closeDialog()
		
		this.props.onConfirm()
	}
	
	
	handleNoButtonClick = () => {
		this.closeDialog()
	}
	
	
	render() {
		const { children, text, ...rest } = this.props
		
		delete rest['onConfirm']
		
		return <div style={ this.style.mainContainer }>
			<FlatButton { ...rest } onClick={ this.handleFloatingButtonClick } />
			
			<ConfirmationDialog
					open={ this.state.open }
					text={ text }
					onYesButtonClick={ this.handleYesButtonClick }
					onNoButtonClick={ this.handleNoButtonClick }
			/>
		</div>
	}
}
