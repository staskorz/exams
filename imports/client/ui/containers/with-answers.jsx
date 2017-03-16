import React, { Component } from 'react';

import { getExamWithAnswers } from '/imports/api/answers/methods';


export default WrappedComponent => class ExamAnswersContainer extends React.Component {
	state = {
		loading: true,
		result: {}
	};
	
	
	updateState = props => {
		const { params: { answersId } } = props;
		
		getExamWithAnswers.call({ answersId }, (err, result) => {
			if(err) {
				console.log('getExamWithAnswers error:', err);
			} else {
				this.setState({
					loading: false,
					result
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
		const { loading, result: { answers, exam, user } } = this.state;
		
		const props = { loading, answers, exam, user }
		
		return (
				<WrappedComponent { ...this.props } { ...props } />
		);
	};
};
