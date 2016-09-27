import React, { Component } from 'react';

import { getExamResults } from '/imports/api/answers/methods';
import ExamResults from '/imports/client/ui/pages/ExamResults';


export default class ExamResultsContainer extends Component {
	state = {
		ready: false,
		results: []
	};
	
	
	updateState = props => {
		const { routeParams: { examId }, currentUser } = props;
		
		if(!currentUser || !currentUser.username) {
			return;
		}
		
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
	
	
	componentDidMount() {
		this.updateState(this.props);
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.updateState(nextProps);
	};
	
	
	render() {
		const { ready, results } = this.state;
		
		return (
				<ExamResults ready={ ready } examResults={ results } />
		);
	};
};
