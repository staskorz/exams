import React, { Component, PropTypes } from 'react';
import { Dialog, FlatButton } from 'material-ui';


export default class ConfirmedFloatingActionButton extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
		open: PropTypes.bool,
		onYesButtonClick: PropTypes.func.isRequired,
		onNoButtonClick: PropTypes.func.isRequired
	};
	
	
	handleRequestClose = () => {
		this.props.onNoButtonClick();
	};
	
	
	render() {
		const { text, open, onYesButtonClick, onNoButtonClick } = this.props;
		
		const actions = [
			<FlatButton
					label="Yes"
					secondary={ true }
					onTouchTap={ onYesButtonClick }
			/>,
			<FlatButton
					label="No"
					primary={ true }
					onTouchTap={ onNoButtonClick }
			/>,
		];
		
		return (
				<Dialog
						open={ open }
						modal={ false }
						title={ text }
						actions={ actions }
						onRequestClose={ this.handleRequestClose }
				/>
		);
	};
}
