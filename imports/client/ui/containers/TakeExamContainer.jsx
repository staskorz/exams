import React, { Component } from 'react';

import { getExamineeVersion } from '/imports/api/exams/methods';
import TakeExam from '/imports/client/ui/pages/TakeExam';
import transformExamServerToClient from './transform-exam-server-to-client';


export default class TakeExamContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	updateState = ({ routeParams: { examId } }) => {
		getExamineeVersion.call({ examId }, (err, exam) => {
			if(err) {
				console.log('getExamineeVersion error:', err);
			} else {
				this.setState({
					ready: true,
					exam: transformExamServerToClient(exam)
				});
			}
		});
	};
	
	
	componentDidMount() {
		this.updateState(this.props);
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.updateState(nextProps);
	};
	
	
	render() {
		const { ready, exam } = this.state;
		
		return (
				<TakeExam ready={ ready } exam={ exam } />
		);
	};
};
