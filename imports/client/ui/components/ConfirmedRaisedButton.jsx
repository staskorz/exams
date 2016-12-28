import React, { Component, PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

import ConfirmationDialog from  './ConfirmationDialog';


export default class ConfirmedRaisedButton extends Component {
	static propTypes = {
		onConfirm: PropTypes.func.isRequired
	};
	
	
	state = {
		open: false
	};
	
	
	style = {
		mainContainer: {
			display: 'inline-block'
		}
	};
	
	
	openDialog = () => {
		this.setState({
			open: true
		});
	};
	
	
	closeDialog = () => {
		this.setState({
			open: false
		});
	};
	
	
	handleFloatingButtonClick = () => {
		const { skipConfirmation } = this.props;
		
		if(skipConfirmation) {
			this.props.onConfirm();
		} else {
			this.openDialog();
		}
	};
	
	
	handleYesButtonClick = () => {
		this.closeDialog();
		
		this.props.onConfirm();
	};
	
	
	handleNoButtonClick = () => {
		this.closeDialog();
	};
	
	
	render() {
		const { children, skipConfirmation, text, ...rest } = this.props;
		
		delete rest['onConfirm'];
		
		return (
				<div style={ this.style.mainContainer }>
					<RaisedButton { ...rest } onClick={ this.handleFloatingButtonClick } />
					
					<ConfirmationDialog
							open={ this.state.open }
							text={ text }
							onYesButtonClick={ this.handleYesButtonClick }
							onNoButtonClick={ this.handleNoButtonClick }
					/>
				</div>
		);
	};
}
