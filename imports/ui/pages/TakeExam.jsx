import React, { Component } from 'react';


export default class TakeExam extends Component {
	render() {
		const { routeParams: { examId } } = this.props;
		
		return (
				<h1>Exam ID: { examId }</h1>
		);
	};
};
