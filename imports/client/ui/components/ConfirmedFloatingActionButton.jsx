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
		
		const { onConfirm, onConfirmParam } = this.props;
		
		onConfirm(onConfirmParam);
	};
	
	
	handleNoButtonClick = () => {
		this.closeDialog();
	};
	
	
	shouldComponentUpdate(nextProps) {
		const { mini, style, disabled, onConfirm, onConfirmParam, text } = this.props;
		
		return mini !== nextProps.mini || style !== nextProps.style || disabled !== nextProps.disabled || onConfirm !== nextProps.onConfirm ||
				onConfirmParam !== nextProps.onConfirmParam || text !== nextProps.text;
	};
	
	
	render() {
		const { children, mini, style, disabled, text } = this.props;
		
		return (
				<div>
					<FloatingActionButton mini={ mini } style={ style } disabled={ disabled } onClick={ this.handleFloatingButtonClick }>
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
