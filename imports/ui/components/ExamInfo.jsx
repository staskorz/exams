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
		
		descriptionText: {
			fontSize: '16px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)',
			marginRight: '16px',
			width: '200px',
			display: 'inline-block'
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
		},
		
		button: {
			marginRight: '16px'
		}
	};
	
	
	render() {
		const { exam, router, onStart } = this.props;
		const { name, questions } = exam || {};
		
		return (
				<div style={ this.style.mainContainer }>
					<Paper style={ this.style.mainPaper } zDepth={ 5 }>
						<div>
							<span style={ this.style.descriptionText }><FormattedMessage id='examName' />:</span>
							<span style={ this.style.mainText }>{ name }</span>
						</div>
						
						<div>
							<span style={ this.style.descriptionText }><FormattedMessage id='numberOfQuestions' />:</span>
							<span style={ this.style.mainText }>{ questions.length }</span>
						</div>
						
						<div style={ this.style.actions }>
							<RaisedButton label={ <FormattedMessage id='start' /> } primary={ true } style={ this.style.button } onClick={ onStart } />
							<RaisedButton label={ <FormattedMessage id='cancel' /> } onClick={ () => router.goBack() } />
						</div>
					</Paper>
				</div>
		);
	};
}


export default withRouter(ExamInfo);
