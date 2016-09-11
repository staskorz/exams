import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, RaisedButton, Checkbox, Badge } from 'material-ui';

import ConfirmedRaisedButton from './ConfirmedRaisedButton';


export default class QuestionAsk extends Component {
	state = {
		answers: []
	};
	
	
	style = {
		mainContainer: {
			padding: '120px'
		},
		
		card: {
			padding: '16px'
		},
		
		primaryLabel: {
			fontSize: '16px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)'
		},
		
		primaryText: {
			fontSize: '24px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)'
		},
		
		secondaryLabel: {
			fontSize: '14px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)',
			marginRight: '16px'
		},
		
		secondaryText: {
			fontSize: '16px',
			fontWeight: 'normal',
			lineHeight: '36px',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)',
			marginRight: '16px'
		},
		
		actions: {
			paddingTop: '32px'
		},
		
		button: {
			marginRight: '16px'
		},
		
		answerContainer: {
			display: 'table'
		},
		
		answerNumberContainer: {
			display: 'table-cell',
			verticalAlign: 'bottom',
			position: 'relative',
			paddingRight: '16px'
		},
		
		answerCheckboxContainer: {
			display: 'table-cell'
		},
		
		answerTextContainer: {
			display: 'table-cell',
			verticalAlign: 'bottom'
		},
		
		answerText: {
			fontSize: '16px',
			fontWeight: 'normal',
			fontFamily: 'Roboto, sans-serif',
			color: 'rgba(0, 0, 0, 0.870588)',
			display: 'block',
			marginBottom: '16px'
		}
	};
	
	
	createCheckboxClickHandler = (questionNumber, answerNumber) => (e, isChecked) => {
		let answers = Object.assign({}, this.state.answers);
		
		if(!answers) {
			answers = [];
		}
		
		if(!answers[questionNumber]) {
			answers[questionNumber] = [];
		}
		
		answers[questionNumber][answerNumber] = !!isChecked;
		
		this.setState({
			answers
		});
	};
	
	
	getAnswer = (questionNumber, answerNumber) => {
		const { answers } = this.state;
		
		const questions = answers || [];
		
		const question = questions[questionNumber] || [];
		
		return !!question[answerNumber];
	};
	
	
	submit = () => {
		const { onFinish } = this.props;
		const { answers } = this.state;
		
		onFinish(answers);
	};
	
	
	render() {
		const { exam, questionNumber, onNext, onPrev, onFinish } = this.props;
		const { name, questions } = exam;
		const numOfQuestions = questions.length;
		const { text, multiple, answers } = questions[questionNumber];
		
		return (
				<div style={ this.style.mainContainer }>
					<Card zDepth={ 5 } style={ this.style.card }>
						<CardTitle title={ name }
								   subtitle={ 'Question Number: ' + (questionNumber + 1) + '/' + numOfQuestions } />
						
						<CardText>
							<span style={ this.style.primaryText }>{ text }</span><br />
							
							<span style={ this.style.secondaryText }>{ multiple ? '* Please choose multiple answers' : ' ' }</span><br /><br />
							
							{ answers.map((answer, index) => (
									<div style={ this.style.answerContainer } key={ index }>
										<div style={ this.style.answerNumberContainer }>
											<Badge badgeContent={ index + 1 } secondary={ true } />
										</div>
										<div style={ this.style.answerCheckboxContainer }>
											<Checkbox onCheck={ this.createCheckboxClickHandler(questionNumber, index) }
													  checked={ this.getAnswer(questionNumber, index) } />
										</div>
										<div style={ this.style.answerTextContainer }>
											<span style={ this.style.answerText }>{ answer }</span>
										</div>
									</div>
							)) }
						</CardText>
						
						<CardActions>
							<RaisedButton label='Prev' onClick={ onPrev } disabled={ questionNumber === 0 } />
							
							{ questionNumber + 1 < numOfQuestions ?
									<RaisedButton label='Next' onClick={ onNext } primary={ true } style={ this.style.button } />
									
									:
									
									<ConfirmedRaisedButton label='Finish' onConfirm={ this.submit } primary={ true } style={ this.style.button }
														   text='Are you sure?' />
							}
						</CardActions>
					</Card>
				</div>
		);
	};
};
