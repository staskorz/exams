import React, { Component } from 'react';
import { Paper, FlatButton } from 'material-ui';
import { pinkA200 } from 'material-ui/styles/colors'


export default class ConnectionStatus extends Component {
	state = {
		retryingIn: null,
		intervalId: null
	};
	
	
	style = {
		mainContainer: {
			display: 'inline-block',
			marginRight: '20px',
			backgroundColor: pinkA200,
			color: 'white'
		},
		
		message: {
			paddingLeft: '16px'
		},
		
		buttonLabel: {
			color: 'white',
			textDecoration: 'underline'
		}
	};
	
	
	clearRunningInterval = () => {
		if(this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}
	};
	
	
	respondToRetryingInUpdate = (retryingIn) => {
		if(retryingIn) {
			this.clearRunningInterval();
			
			this.setState({
				intervalId: setInterval(() => {
					const { retryingIn } = this.state;
					
					if(retryingIn) {
						this.setState({
							retryingIn: retryingIn - 1
						});
					} else {
						this.clearRunningInterval();
						
						this.setState({
							intervalId: null,
							retryingIn: null
						});
					}
				}, 1000),
				
				retryingIn
			});
		} else {
			if(this.state.intervalId) {
				this.clearRunningInterval();
				
				this.setState({
					intervalId: null,
					retryingIn: null
				});
			}
		}
	};
	
	
	componentDidMount() {
		this.respondToRetryingInUpdate(this.props.retryingIn);
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.respondToRetryingInUpdate(nextProps.retryingIn);
	};
	
	
	render() {
		const { connected, reconnect } = this.props;
		
		const { retryingIn } = this.state;
		
		if(connected) {
			return <div></div>;
		} else {
			let message;
			
			if(retryingIn) {
				message = 'Retrying in ' + retryingIn + 's.';
			} else {
				message = 'Disconnected.';
			}
			
			return (
					<Paper style={ this.style.mainContainer }>
						<span style={ this.style.message }>{ message }</span>
						<FlatButton label={ 'Reconnect Now' } labelStyle={ this.style.buttonLabel } onClick={ reconnect } />
					</Paper>
			);
		}
	};
};
