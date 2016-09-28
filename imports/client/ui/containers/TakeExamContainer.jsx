import React, { Component } from 'react';

import { getExamineeVersion } from '/imports/api/exams/methods';
import TakeExam from '/imports/client/ui/pages/TakeExam';


export default class TakeExamContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	updateState = ({ currentUser, routeParams: { examId } }) => {
		if(!currentUser) {
			return;
		}
		
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
