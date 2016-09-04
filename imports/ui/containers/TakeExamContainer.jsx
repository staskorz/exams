import React, { Component } from 'react';

import { getBriefDetails } from '/imports/api/exams/methods';
import TakeExam from '/imports/ui/pages/TakeExam';


export default class TakeExamContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	componentDidMount = () => {
		const { routeParams: { examId } } = this.props;
		
		getBriefDetails.call({ examId }, (err, res) => {
			if(err) {
				console.log('getBriefDetails error:', err);
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
				<TakeExam ready={ ready } exam={ exam } />
		);
	};
};
