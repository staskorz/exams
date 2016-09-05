import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


class TakeExam extends Component {
	style = {
		mainContainer: {
			padding: '120px',
			paddingTop: '20px'
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
		const { exam: { _id, name, number, numOfQuestions }, ready, router } = this.props;
		
		return (
				<div style={ this.style.mainContainer }>
					{ ready ?
							<Paper style={ this.style.mainPaper }>
								<div>
									<span style={ this.style.descriptionText }>Exam Name:</span>
									<span style={ this.style.mainText }>{ name }</span>
								</div>
								
								<div>
									<span style={ this.style.descriptionText }>Exam Number:</span>
									<span style={ this.style.mainText }>{ number }</span>
								</div>
								
								<div>
									<span style={ this.style.descriptionText }>Number of Questions:</span>
									<span style={ this.style.mainText }>{ numOfQuestions }</span>
								</div>
								
								<div style={ this.style.actions }>
									<RaisedButton label='Next' primary={ true } style={ this.style.button } />
									<RaisedButton label='Cancel' onClick={ () => router.goBack() } />
								</div>
							</Paper>
							
							:
							
							<LoadingIndicator />
					}
				</div>
		);
	};
}


export default withRouter(TakeExam);
