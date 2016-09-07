import React, { Component } from 'react';

import { getBriefDetails } from '/imports/api/exams/methods';
import ExamInfo from '/imports/ui/components/ExamInfo';


export default class ExamInfoContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	normalizeExam = exam => {
		const { questions, ...rest } = exam;
		
		return Object.assign({}, rest, { numOfQuestions: Array.isArray(questions) ? questions.length : null });
	};
	
	
	componentDidMount = () => {
		const { examId, onNumOfQuestionsChange } = this.props;
		
		getBriefDetails.call({ examId }, (err, res) => {
			if(err) {
				console.log('getBriefDetails error:', err);
			} else {
				const exam = this.normalizeExam(res);
				
				onNumOfQuestionsChange(exam.numOfQuestions);
				
				this.setState({
					ready: true,
					exam
				});
			}
		});
	};
	
	
	render() {
		const { onNext } = this.props;
		const { ready, exam } = this.state;
		
		return (
				<ExamInfo ready={ ready } exam={ exam } onNext={ onNext } />
		);
	};
};
