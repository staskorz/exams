import React, { Component } from 'react';

import { getExamResults } from '/imports/api/answers/methods';
import ExamResults from '/imports/client/ui/pages/ExamResults';


export default class ExamResultsContainer extends Component {
	state = {
		ready: false,
		exam: {}
	};
	
	
	componentDidMount() {
		const { routeParams: { examId } } = this.props;
		
		getExamResults.call({ examId }, (err, results) => {
			if(err) {
				console.log('getExamResults error:', err);
			} else {
				this.setState({
					ready: true,
					results
				});
			}
		});
	};
	
	
	render() {
		const { ready, exam } = this.state;
		
		return (
				<ExamResults ready={ ready } exam={ exam } />
		);
	};
};
