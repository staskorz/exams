import React from 'react';
import { Card, CardTitle, CardText, CardActions, RaisedButton } from 'material-ui';

import ConfirmedRaisedButton from './ConfirmedRaisedButton';


const style = {
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
	}
};


export default ({ exam, questionNumber, onNext, onPrev, onFinish }) => {
	const { name, number, questions } = exam;
	const numOfQuestions = questions.length;
	const { text, multiple, answers } = questions[questionNumber];
	
	return (
			<div style={ style.mainContainer }>
				<Card zDepth={ 5 } style={ style.card }>
					<CardTitle title={ name }
							   subtitle={ 'Exam Number: ' + number + ', Question Number: ' + (questionNumber + 1) + '/' + numOfQuestions } />
					
					<CardText>
						<span style={ style.primaryText }>{ text }</span><br />
						
						<span style={ style.secondaryText }>{ multiple ? '* Please choose multiple answers' : ' ' }</span><br /><br />
						
						{ answers.map((answer, index) => (
								<div key={ index }>{ index + 1 + '. ' + answer }</div>
						)) }
					</CardText>
					
					<CardActions>
						<RaisedButton label='Prev' onClick={ onPrev } disabled={ questionNumber === 0 } />
						
						{ questionNumber + 1 < numOfQuestions ?
								<RaisedButton label='Next' onClick={ onNext } primary={ true } style={ style.button } />
								
								:
								
								<ConfirmedRaisedButton label='Finish' onConfirm={ onFinish } primary={ true } style={ style.button }
													   text='Are you sure?' />
						}
					</CardActions>
				</Card>
			</div>
	)
};
