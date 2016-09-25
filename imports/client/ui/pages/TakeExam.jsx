import React, { Component } from 'react';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';
import ExamInfo from '/imports/client/ui/components/ExamInfo';
import ExamMissing from '/imports/client/ui/components/ExamMissing';
import QuestionAsk from '/imports/client/ui/components/QuestionAsk';
import shuffleArray from '/imports/client/shuffle-array';
import { insert as insertAnswers } from '/imports/api/answers/methods';


export default class TakeExam extends Component {
	state = {
		questionNumber: -1,
		shuffledExam: null,
		unShuffleAnswers: null
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
	
	
	handleFinishButtonClick = shuffledAnswers => {
		const { exam: { _id: examId } } = this.props;
		
		const answers = this.unShuffleAnswers(shuffledAnswers);
		
		const answersObject = {
			examId,
			questions: answers.map(answer => ({ answers: answer }))
		};
		
		console.log('answersObject:', answersObject);
		
		insertAnswers.call(answersObject, (error, result) => {
			if(error) {
				console.log('insertAnswers error:', error);
			} else {
				console.log('insertAnswers result:', result);
			}
		});
	};
	
	
	unShuffleAnswers = answers => {
		const { unShuffleAnswers } = this.state;
		
		return unShuffleAnswers(answers);
	};
	
	
	updateShuffledExamInState = ({ ready, exam }) => {
		if(ready && exam) {
			const { name, questions } = exam;
			
			const { shuffledArray, unShuffle } = shuffleArray(questions);
			
			const shuffledExam = Object.assign({}, { name, questions: shuffledArray });
			
			this.setState({
				shuffledExam,
				unShuffleAnswers: unShuffle
			});
		}
	};
	
	
	componentWillMount() {
		this.updateShuffledExamInState(this.props);
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.updateShuffledExamInState(nextProps);
	};
	
	
	render() {
		const { ready } = this.props;
		
		if(!ready) {
			return <LoadingIndicator />;
		}
		
		const { shuffledExam, questionNumber } = this.state;
		
		if(!shuffledExam) {
			return <ExamMissing />;
		}
		
		if(questionNumber === -1) {
			return <ExamInfo exam={ shuffledExam } onStart={ this.handleNextButtonClick } />;
		}
		
		return (
				<QuestionAsk exam={ shuffledExam } questionNumber={ questionNumber }
							 onNext={ this.handleNextButtonClick }
							 onPrev={ this.handlePrevButtonClick } onFinish={ this.handleFinishButtonClick } />
		);
	};
}
