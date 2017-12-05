import React from 'react'
import { Card, CardTitle, CardText, CardActions, RaisedButton, Checkbox, Badge } from 'material-ui'
import { FormattedMessage } from 'react-intl'
import { cyan500 } from 'material-ui/styles/colors'

import ConfirmedRaisedButton from '../../components/ConfirmedRaisedButton'
import NumberedImagesBlock from '../../components/NumberedImagesBlock'


const style = {
	card: {
		padding: '16px',
	},
	
	cardText: {
		minHeight: '250px',
	},
	
	primaryLabel: {
		fontSize: '16px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
	},
	
	primaryText: {
		fontSize: '24px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
	},
	
	secondaryLabel: {
		fontSize: '14px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
		marginRight: '16px',
	},
	
	secondaryText: {
		fontSize: '16px',
		fontWeight: 'normal',
		lineHeight: '36px',
		fontFamily: 'Roboto, sans-serif',
		color: cyan500,
		marginRight: '16px',
	},
	
	actions: {
		paddingTop: '32px',
	},
	
	button: {
		marginRight: '16px',
	},
	
	imagesBlockContainer: {
		paddingTop: '32px',
		paddingBottom: '8px',
	},
	
	answerContainer: {
		display: 'table',
	},
	
	answerNumberContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
		position: 'relative',
		paddingLeft: '16px',
	},
	
	answerCheckboxContainer: {
		display: 'table-cell',
	},
	
	answerTextContainer: {
		display: 'table-cell',
		verticalAlign: 'bottom',
	},
	
	answerText: {
		fontSize: '16px',
		fontWeight: 'normal',
		fontFamily: 'Roboto, sans-serif',
		color: 'rgba(0, 0, 0, 0.870588)',
		display: 'block',
		marginBottom: '16px',
	},
}


export default ({
					exam: { name, questions },
					questionNumber,
					goToNextQuestion,
					goToPrevQuestion,
					answers,
					answerSelectionHandler,
					intl: { formatMessage },
					onSave,
				}) => <div className='main-container-padding'>
	<Card style={ style.card }>
		<CardTitle title={ name }
				subtitle={ <FormattedMessage id='questionNumberXofY'
						values={ { number: questionNumber + 1, of: questions.length } } /> } />
		
		<CardText style={ style.cardText }>
			<span style={ style.primaryText }>{ questions[questionNumber].text }</span><br />
			
			<NumberedImagesBlock images={ questions[questionNumber].images }
					style={ style.imagesBlockContainer } />
			
			<span style={ style.secondaryText }>{ questions[questionNumber].multiple ?
					<FormattedMessage id='multipleCorrectAnswersAvailable' /> : ' ' }</span><br /><br />
			
			{ questions[questionNumber].answers.map((answer, index) => (
					<div style={ style.answerContainer } key={ index }>
						<div style={ style.answerNumberContainer }>
							<Badge badgeContent={ index + 1 } primary={ true } />
						</div>
						<div style={ style.answerCheckboxContainer }>
							<Checkbox onCheck={ answerSelectionHandler }
									checked={ answers[questionNumber][index] }
									name={ '' + index } />
						</div>
						<div style={ style.answerTextContainer }>
							<span style={ style.answerText }>{ answer }</span>
						</div>
					</div>
			)) }
		</CardText>
		
		<CardActions>
			<RaisedButton label={ <FormattedMessage id='previous' /> } onClick={ goToPrevQuestion }
					disabled={ questionNumber === 0 }
					style={ style.button } />
			
			{ questionNumber + 1 < questions.length ?
					<RaisedButton label={ <FormattedMessage id='next' /> } onClick={ goToNextQuestion }
							primary={ true }
							style={ style.button } />
					
					:
					
					<ConfirmedRaisedButton label={ <FormattedMessage id='finish' /> }
							onConfirm={ answers => onSave(answers) } primary={ true }
							style={ style.button } text={ formatMessage({ id: 'areYouSure' }) } />
			}
		</CardActions>
	</Card>
</div>
