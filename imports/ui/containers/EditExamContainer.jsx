import React, { Component } from 'react';

import { findOne as findOneExam } from '/imports/api/exams/methods';
import CreateExam from '/imports/ui/pages/CreateExam';


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
				<CreateExam ready={ ready } initialValues={ exam } edit={ true } />
		);
	};
};
