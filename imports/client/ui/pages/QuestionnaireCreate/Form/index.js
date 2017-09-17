import React from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { compose, onlyUpdateForKeys } from 'recompose'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import IconAdd from 'material-ui/svg-icons/content/add'

import replaceArrayElement from '../../../../replace-array-element'
import removeArrayElement from '../../../../remove-array-element'
import ConfirmedRaisedButton from '../../../components/ConfirmedRaisedButton'

import TextField from './TextField'
import Checkbox from './Checkbox'
import Question from './Question'


const EnhancedQuestion = compose(
		onlyUpdateForKeys(['value', 'canRemove']),
		injectIntl,
)(Question)


const style = {
	mainContainer: {
		paddingTop: '4px',
	},
	
	form: {
		padding: '16px',
	},
	
	title: {
		paddingRight: '0',
	},
	
	question: {
		marginTop: '32px',
	},
	
	addQuestionButton: {
		marginLeft: '10px',
		marginTop: '10px',
	},
	
	button: {
		marginTop: '48px',
		marginRight: '16px',
	},
}


const onTitleChange = setValue => value => {
	setValue(prev => ({
		...prev,
		questionnaireName: value,
	}))
}


const onPublishedChange = setValue => value => {
	setValue(prev => ({
		...prev,
		published: value,
	}))
}


const onQuestionChange = (setValue, questionIndex) => value => {
	setValue(prev => ({
		...prev,
		questions: replaceArrayElement(prev.questions, questionIndex, value),
	}))
}


const onQuestionAdd = setValue => () => {
	setValue(prev => ({
		...prev,
		
		questions: [...prev.questions, {
			text: '',
			answers: [
				{
					text: '',
				},
				{
					text: '',
				},
			],
		}],
	}))
}


const onQuestionRemove = (setValue, questionIndex) => () => {
	setValue(prev => ({
		...prev,
		questions: removeArrayElement(prev.questions, questionIndex),
	}))
}


export default ({ value, setValue, errors, intl: { formatMessage } }) => <div
		className='main-container-padding'
		style={ style.mainContainer }
>
	<form style={ style.form }>
		<h1 style={ style.title }><FormattedMessage id='createQuestionnaire' /></h1>
		
		<TextField
				label={ <FormattedMessage id='questionnaireName' /> }
				value={ value.questionnaireName }
				onChange={ onTitleChange(setValue) }
				errorText={ errors.questionnaireName }
		/>
		
		<Checkbox
				label={ <FormattedMessage id='published' /> }
				value={ !!value.published }
				onChange={ onPublishedChange(setValue) }
		/>
		
		{ value.questions.map((question, index) => <EnhancedQuestion
				key={ index }
				number={ index + 1 }
				style={ style.question }
				value={ question }
				onChange={ onQuestionChange(setValue, index) }
				onRemove={ onQuestionRemove(setValue, index) }
				canRemove={ value.questions.length > 1 }
				errors={ errors.questions[index] }
		/>) }
		
		<FloatingActionButton mini={ true } style={ style.addQuestionButton } onClick={ onQuestionAdd(setValue) }>
			<IconAdd />
		</FloatingActionButton>
		
		<div>
			<RaisedButton
					style={ style.button }
					label={ <FormattedMessage id='save' /> }
					primary={ true }
					onClick={ f => f } disabled={ false }
			/>
			
			<ConfirmedRaisedButton
					style={ style.button }
					skipConfirmation={ false }
					text={ formatMessage({ id: 'areYouSure' }) }
					label={ <FormattedMessage id='cancel' /> }
					onConfirm={ f => f }
					disabled={ false }
			/>
		</div>
	</form>
</div>
