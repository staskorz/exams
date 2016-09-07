import React, { Component } from 'react';

import ExamInfoContainer from '/imports/ui/containers/ExamInfoContainer';
import NextQuestionContainer from '/imports/ui/containers/NextQuestionContainer';


export default class TakeExam extends Component {
	state = {
		numOfQuestions: null,
		questionNumber: -1
	};
	
	
	handleNextButtonClick = () => {
		const { numOfQuestions, questionNumber } = this.state;
		
		if(questionNumber + 1 < numOfQuestions) {
			this.setState({
				questionNumber: questionNumber + 1
			});
		}
	};
	
	
	handleNumOfQuestionsChange = numOfQuestions => {
		this.setState({
			numOfQuestions
		});
	};
	
	
	render() {
		const { routeParams: { examId } } = this.props;
		const { questionNumber } = this.state;
		
		return (
				<div>
					{ questionNumber === -1 ?
							<ExamInfoContainer examId={ examId } onNext={ this.handleNextButtonClick }
											   onNumOfQuestionsChange={ this.handleNumOfQuestionsChange } />
							
							:
							
							<NextQuestionContainer examId={ examId } questionNumber={ questionNumber } />
					}
				</div>
		);
	};
}
