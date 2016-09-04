import React, { Component } from 'react';
import { FlatButton } from 'material-ui';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


export default class TakeExam extends Component {
	style = {
		mainContainer: {
			padding: '120px',
			paddingTop: '20px'
		},
		
		contentContainer: {
			padding: '16px',
			paddingTop: '0px'
		}
	};
	
	render() {
		const { exam: { _id, name, number, numOfQuestions }, ready } = this.props;
		
		return (
				<div style={ this.style.mainContainer }>
					{ ready ?
							<div>
								<h1>Exam ID: { _id }</h1>
								<div style={ this.style.contentContainer }>
									<p>Exam Name: { name }</p>
									<p>Exam Number: { number }</p>
									<p>Number of Questions: { numOfQuestions }</p>
								</div>
							</div>
							
							:
							
							<LoadingIndicator />
					}
				</div>
		);
	};
};
