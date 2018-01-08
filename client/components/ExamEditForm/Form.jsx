import React from 'react'
import { RaisedButton, FloatingActionButton } from 'material-ui'
import IconAdd from 'material-ui/svg-icons/content/add'
import { FormattedMessage } from 'react-intl'
import { Prompt } from 'react-router-dom'

import TextField from '../TextField'
import Toggle from '../Toggle'
import ConfirmedRaisedButton from '../ConfirmedRaisedButton'

import Question from './Question'


const style = {
	mainContainer: {
		paddingBottom: '120px',
		paddingTop: '20px',
	},
	
	h1: {
		marginBottom: '0px',
	},
	
	formContainer: {
		paddingTop: '0px',
	},
	
	examName: {
		marginBottom: '28px',
	},
	
	autoWeightContainer: {
		marginTop: '4px',
		width: '140px',
	},
	
	formError: {
		height: '24px',
		marginTop: '16px',
		marginRight: '36px',
		fontFamily: 'Roboto, sans-serif',
		fontSize: '12px',
		lineHeight: '12px',
		color: 'rgb(244, 67, 54)',
	},
	
	button: {
		marginLeft: '8px',
		marginRight: '8px',
	},
	
	addQuestionButton: {
		marginLeft: '10px',
		marginTop: '10px',
	},
}


let leaveConfirmed = false

const confirmedLeave = history => {
	leaveConfirmed = true
	history.push('/list-exams')
}


export default ({
					value, onNameChange, onQuestionChange, onQuestionAdd, onQuestionRemove, errors, errorsDetected,
					autoWeight, onAutoWeightChange, modified, onSave, submitting,
					history, intl: { formatMessage }, match: { params: { examId } },
				}) => <div style={ style.mainContainer } className='main-container-padding'>
	<Prompt message='Are you sure you want to leave this page?' when={ modified && !leaveConfirmed } />
	
	<h1 style={ style.h1 }><FormattedMessage id={ examId ? 'editExam' : 'createExam' } /></h1>
	
	<form>
		<div className='formContainer' style={ style.formContainer }>
			<TextField
					name='name'
					label={ <FormattedMessage id='examName' /> }
					value={ value.name }
					onChange={ onNameChange }
					errorText={ errors.name }
					style={ style.examName }
			/>
			
			<div style={ style.autoWeightContainer }>
				<Toggle
						value={ autoWeight }
						label={ <FormattedMessage id='autoWeight' /> }
						onChange={ onAutoWeightChange }
				/>
			</div>
			
			{ value.questions.map((question, index) => <Question
					value={ question }
					errors={ errors.questions[index] }
					autoWeight={ autoWeight }
					onChange={ onQuestionChange }
					onRemove={ onQuestionRemove }
					removable={ value.questions.length > 1 }
					questionIndex={ index }
					key={ index }
			/>) }
			
			<FloatingActionButton mini={ true } style={ style.addQuestionButton } onClick={ onQuestionAdd }>
				<IconAdd />
			</FloatingActionButton>
		</div>
		
		<div style={ style.formError }>{ errorsDetected ?
				<FormattedMessage id='formHasErrors' /> : ' ' }</div>
		
		<div className='buttonsContainer'>
			<RaisedButton style={ style.button } label={ <FormattedMessage id='save' /> }
					primary={ true }
					onClick={ () => onSave(value) }
					disabled={ errorsDetected || submitting }
			/>
			
			<ConfirmedRaisedButton style={ style.button } skipConfirmation={ !modified }
					disabled={ submitting }
					text={ formatMessage({ id: 'areYouSure' }) }
					label={ <FormattedMessage id='cancel' /> } onConfirm={ () => confirmedLeave(history) }
			/>
		</div>
	</form>
</div>
