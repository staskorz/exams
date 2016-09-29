import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, RaisedButton, Checkbox, Badge } from 'material-ui';
import { FormattedMessage, injectIntl } from 'react-intl';
import { cyan500 } from 'material-ui/styles/colors';

import ConfirmedRaisedButton from './ConfirmedRaisedButton';


class QuestionAsk extends Component {
	state = {
		answers: []
	};
	
	
	style = {
		card: {
			padding: '16px'
		},
		
		cardText: {
			minHeight: '250px'
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
			color: cyan500,
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
			paddingLeft: '16px'
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
	
	
	prepareAnswersState = props => {
		const { questionNumber, exam: { questions } } = props;
		
		let answers;
		
		if(this.state.answers.length === 0) {
			answers = new Array(questions.length);
		} else {
			answers = Array.from(this.state.answers);
		}
		
		if((!answers[questionNumber]) || (answers[questionNumber].length === 0)) {
			answers[questionNumber] = new Array(questions[questionNumber].answers.length).fill(false);
		}
		
		this.setState({
			answers
		});
	};
	
	
	componentWillMount() {
		this.prepareAnswersState(this.props);
	};
	
	
	componentWillReceiveProps(nextProps) {
		this.prepareAnswersState(nextProps);
	};
	
	
	createCheckboxClickHandler = (questionNumber, answerNumber) => (e, isChecked) => {
		const answers = Array.from(this.state.answers);
		
		const { exam: { questions } } = this.props;
		
		const { multiple } = questions[questionNumber];
		
		if(multiple || !isChecked) {
			answers[questionNumber][answerNumber] = !!isChecked;
		} else {
			answers[questionNumber] = answers[questionNumber].map((answer, index) => index === answerNumber);
		}
		
		this.setState({
			answers
		});
	};
	
	
	submit = () => {
		const { onFinish } = this.props;
		const { answers } = this.state;
		
		onFinish(answers);
	};
	
	
	render() {
		const { exam, questionNumber, onNext, onPrev, intl: { formatMessage } } = this.props;
		const { name, questions } = exam;
		const numOfQuestions = questions.length;
		const { text, multiple, answers } = questions[questionNumber];
		
		return (
				<div className='main-container-padding'>
					<Card style={ this.style.card }>
						<CardTitle title={ name }
								   subtitle={ <FormattedMessage id='questionNumberXofY'
																values={{ number: questionNumber + 1, of: numOfQuestions }} /> } />
						
						<CardText style={ this.style.cardText }>
							<span style={ this.style.primaryText }>{ text }</span><br />
							
							<span style={ this.style.secondaryText }>{ multiple ?
									<FormattedMessage id='multipleCorrectAnswersAvailable' /> : ' ' }</span><br /><br />
							
							{ answers.map((answer, index) => (
									<div style={ this.style.answerContainer } key={ index }>
										<div style={ this.style.answerNumberContainer }>
											<Badge badgeContent={ index + 1 } secondary={ true } />
										</div>
										<div style={ this.style.answerCheckboxContainer }>
											<Checkbox onCheck={ this.createCheckboxClickHandler(questionNumber, index) }
													  checked={ this.state.answers[questionNumber][index] } />
										</div>
										<div style={ this.style.answerTextContainer }>
											<span style={ this.style.answerText }>{ answer }</span>
										</div>
									</div>
							)) }
						</CardText>
						
						<CardActions>
							<RaisedButton label={ <FormattedMessage id='previous' /> } onClick={ onPrev } disabled={ questionNumber === 0 }
										  style={ this.style.button } />
							
							{ questionNumber + 1 < numOfQuestions ?
									<RaisedButton label={ <FormattedMessage id='next' /> } onClick={ onNext } primary={ true }
												  style={ this.style.button } />
									
									:
									
									<ConfirmedRaisedButton label={ <FormattedMessage id='finish' /> } onConfirm={ this.submit } primary={ true }
														   style={ this.style.button } text={ formatMessage({ id: 'areYouSure' }) } />
							}
						</CardActions>
					</Card>
				</div>
		);
	};
}


export default injectIntl(QuestionAsk);
