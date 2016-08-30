import React, { Component } from 'react';

import { findOne as findOneExam } from '/imports/api/exams/methods';
import ExamEditForm from '/imports/ui/components/ExamEditForm';


export default class EditExamContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	componentDidMount = () => {
		const { examId } = this.props;
		
		findOneExam.call({ examId }, (err, res) => {
			if(err) {
				console.log('findOneExam error:', err);
			} else {
				this.setState({
					ready: true,
					exam: res
				});
			}
		});
	};
	
	
	render() {
		const { ready, exam } = this.state;
		
		return (
				<ExamEditForm ready={ ready } initialValues={ exam } edit={ true } />
		);
	};
};
