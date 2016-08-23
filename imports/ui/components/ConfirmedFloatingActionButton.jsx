import React, { Component, PropTypes } from 'react';
import { FloatingActionButton } from 'material-ui';

import ConfirmationDialog from  './ConfirmationDialog';


export default class ConfirmedFloatingActionButton extends Component {
	static propTypes = {
		onConfirm: PropTypes.func.isRequired
	};
	
	
	state = {
		open: false
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
		this.openDialog();
	};
	
	
	handleYesButtonClick = () => {
		this.closeDialog();
		
		this.props.onConfirm();
	};
	
	
	handleNoButtonClick = () => {
		this.closeDialog();
	};
	
	
	render() {
		const { children, text, ...rest } = this.props;
		
		delete rest['onConfirm'];
		
		return (
				<div>
					<FloatingActionButton { ...rest } onClick={ this.handleFloatingButtonClick }>
						{ children }
					</FloatingActionButton>
					
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
