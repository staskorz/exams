import React, { Component } from 'react';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';
import ExamInfo from '/imports/ui/components/ExamInfo';
import ExamMissing from '/imports/ui/components/ExamMissing';
import QuestionAsk from '/imports/ui/components/QuestionAsk';


export default class TakeExam extends Component {
	state = {
		questionNumber: -1
	};
	
	
	handleNextButtonClick = () => {
		const { questionNumber } = this.state;
		const { exam: { questions } } = this.props;
		
		if(questionNumber + 1 < questions.length) {
			this.setState({
				questionNumber: questionNumber + 1
			});
		}
	};
	
	
	handlePrevButtonClick = () => {
		const { questionNumber } = this.state;
		
		if(questionNumber > 0) {
			this.setState({
				questionNumber: questionNumber - 1
			});
		}
	};
	
	
	handleFinishButtonClick = (answers) => {
		console.log('answers:', answers);
	};
	
	
	render() {
		const { ready, exam } = this.props;
		const { questionNumber } = this.state;
		
		return (
				<div>
					{ ready ?
							<div>
								{ !!exam ?
										<div>
											{ questionNumber === -1 ?
													<ExamInfo exam={ exam } onStart={ this.handleNextButtonClick } />
													
													:
													
													<QuestionAsk exam={ exam } questionNumber={ questionNumber } onNext={ this.handleNextButtonClick }
																 onPrev={ this.handlePrevButtonClick } onFinish={ this.handleFinishButtonClick } />
											}
										</div>
										
										:
										
										<ExamMissing />
								}
							</div>
							
							:
							
							<LoadingIndicator />
					}
				</div>
		);
	};
}
