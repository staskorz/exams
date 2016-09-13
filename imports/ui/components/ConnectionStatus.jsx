import React, { Component } from 'react';
import { Paper, FlatButton } from 'material-ui';
import { pinkA200 } from 'material-ui/styles/colors';
import { FormattedMessage, injectIntl } from 'react-intl';


class ConnectionStatus extends Component {
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
			paddingRight: '16px'
		},
		
		buttonLabel: {
			color: 'white',
			textDecoration: 'underline'
		}
	};
	
	
	clearRunningInterval = (resetState) => {
		if(this.state.intervalId) {
			clearInterval(this.state.intervalId);
			
			if(resetState) {
				this.setState({
					intervalId: null,
					retryingIn: null
				});
			}
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
						this.clearRunningInterval(true);
					}
				}, 1000),
				
				retryingIn
			});
		} else {
			if(this.state.intervalId) {
				this.clearRunningInterval(true);
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
		const { connected, reconnect, intl: { formatMessage } } = this.props;
		
		const { retryingIn } = this.state;
		
		if(connected) {
			return <div></div>;
		} else {
			let message;
			
			if(retryingIn) {
				message = formatMessage({ id: 'retryingInX' }, { seconds: retryingIn });
			} else {
				message = formatMessage({ id: 'disconnected' });
			}
			
			return (
					<Paper style={ this.style.mainContainer }>
						<span style={ this.style.message }>{ message }</span>
						<FlatButton label={ <FormattedMessage id='reconnectNow' /> } labelStyle={ this.style.buttonLabel } onClick={ reconnect } />
					</Paper>
			);
		}
	};
}


export default injectIntl(ConnectionStatus);
