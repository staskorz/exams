import React, { Component, PropTypes } from 'react';
import { FloatingActionButton, Dialog, FlatButton } from 'material-ui';


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
	
	
	handleRequestClose = () => {
		this.closeDialog();
	};
	
	
	render() {
		const { children, text, ...rest } = this.props;
		
		delete rest['onConfirm'];
		
		const actions = [
			<FlatButton
					label="Yes"
					secondary={ true }
					onTouchTap={ this.handleYesButtonClick }
			/>,
			<FlatButton
					label="No"
					primary={ true }
					onTouchTap={ this.handleNoButtonClick }
			/>,
		];
		
		return (
				<div>
					<FloatingActionButton { ...rest } onClick={ this.handleFloatingButtonClick }>
						{ children }
					</FloatingActionButton>
					<Dialog
							open={ this.state.open }
							modal={ false }
							title={ text }
							actions={ actions }
							onRequestClose={ this.handleRequestClose }
					/>
				</div>
		);
	};
}
