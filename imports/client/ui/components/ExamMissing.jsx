import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';


class ExamInfo extends Component {
	style = {
		mainContainer: {
			padding: '120px'
		},
		
		mainPaper: {
			padding: '32px'
		},
		
		mainText: {
			fontSize: '24px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)'
		},
		
		actions: {
			paddingTop: '32px'
		}
	};
	
	
	render() {
		const { router } = this.props;
		
		return (
				<div style={ this.style.mainContainer }>
					<Paper style={ this.style.mainPaper } zDepth={ 5 }>
						<div>
							<span style={ this.style.mainText }><FormattedMessage id='examMissing' /></span>
						</div>
						
						<div style={ this.style.actions }>
							<RaisedButton label={ <FormattedMessage id='exit' /> } primary={ true } onClick={ () => router.goBack() } />
						</div>
					</Paper>
				</div>
		);
	};
}


export default withRouter(ExamInfo);
