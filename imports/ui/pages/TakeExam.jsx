import React, { Component } from 'react';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


export default class TakeExam extends Component {
	render() {
		const { exam: { _id, name, number, questions }, ready } = this.props;
		
		return (
				<div>
					{ ready ?
							<div>
								<h1>Exam ID: { _id }</h1>
								<p>Exam Name: { name }</p>
								<p>Exam Number: { number }</p>
								<p>Number of Questions: { questions.length }</p>
							</div>
							
							:
							
							<LoadingIndicator />
					}
				</div>
		);
	};
};
