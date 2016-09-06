import React, { Component } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';
import NextQuestionContainer from '/imports/ui/containers/NextQuestionContainer';


class TakeExam extends Component {
	state = {
		questionNumber: -1
	};
	
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
	
	
	handleNextButtonClick = () => {
		const { exam: { numOfQuestions } } = this.props;
		const { questionNumber } = this.state;
		
		if(questionNumber + 1 < numOfQuestions) {
			this.setState({
				questionNumber: questionNumber + 1
			});
		}
	};
	
	
	render() {
		const { exam, ready, router } = this.props;
		const { _id, name, number, numOfQuestions } = exam || {};
		const { questionNumber } = this.state;
		
		return (
				<div style={ this.style.mainContainer }>
					{ ready ?
							<Paper style={ this.style.mainPaper } zDepth={ 5 }>
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
								
								{ questionNumber > -1 ?
										<NextQuestionContainer examId={ _id } questionNumber={ questionNumber } />
										
										:
										
										''
								}
								
								<div style={ this.style.actions }>
									<RaisedButton label='Next' primary={ true } style={ this.style.button } onClick={ this.handleNextButtonClick } />
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
