import React, { Component } from 'react';

import { getExamineeVersion } from '/imports/api/exams/methods';
import TakeExam from '/imports/ui/pages/TakeExam';


export default class TakeExamContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	componentDidMount = () => {
		const { routeParams: { examId } } = this.props;
		
		getExamineeVersion.call({ examId }, (err, exam) => {
			if(err) {
				console.log('getExamineeVersion error:', err);
			} else {
				this.setState({
					ready: true,
					exam
				});
			}
		});
	};
	
	
	render() {
		const { ready, exam } = this.state;
		
		return (
				<TakeExam ready={ ready } exam={ exam } />
		);
	};
};
