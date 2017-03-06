import React, { Component } from 'react';

import { getExamResults } from '/imports/api/answers/methods';


export default WrappedComponent => class ExamResultsContainer extends React.Component {
	state = {
		loading: true,
		results: []
	};
	
	
	updateState = props => {
		const { params: { examId } } = props;
		
		getExamResults.call({ examId }, (err, results) => {
			if(err) {
				console.log('getExamResults error:', err);
			} else {
				this.setState({
					loading: false,
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
		const { loading, results } = this.state;
		
		return (
				<WrappedComponent { ...this.props } loading={ loading } examResults={ results } />
		);
	};
};
