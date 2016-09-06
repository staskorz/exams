import React, { Component } from 'react';

import { getQuestion } from '/imports/api/exams/methods';
import NextQuestion from '/imports/ui/components/NextQuestion';


export default class NextQuestionContainer extends Component {
	state = {
		ready: false,
		question: {}
	};
	
	
	fetchQuestion = ({ examId, questionNumber }) => {
		getQuestion.call({ examId, questionNumber }, (err, res) => {
			if(err) {
				console.log('getQuestion error:', err);
			} else {
				this.setState({
					ready: true,
					question: res
				});
			}
		});
	};
	
	
	componentDidMount = () => {
		this.fetchQuestion(this.props);
	};
	
	
	componentWillReceiveProps = nextProps => {
		this.fetchQuestion(nextProps);
	};
	
	
	render() {
		const { ready, question } = this.state;
		
		return (
				<NextQuestion ready={ ready } { ...question } />
		);
	};
};
