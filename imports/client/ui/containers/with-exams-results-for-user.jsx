import React, { Component } from 'react';

import { getExamResultsForUser } from '/imports/api/answers/methods';


export default WrappedComponent => class ExamResultsForUserContainer extends React.Component {
	state = {
		loading: true,
		results: []
	};
	
	
	updateState = props => {
		const { params: { userId } } = props;
		
		getExamResultsForUser.call({ userId }, (err, results) => {
			if(err) {
				console.log('getExamResultsForUser error:', err);
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
