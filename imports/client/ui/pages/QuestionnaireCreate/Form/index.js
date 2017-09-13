import React from 'react'
import { FormattedMessage } from 'react-intl'
import { onlyUpdateForKeys } from 'recompose'

import replaceArrayElement from '../../../../replace-array-element'

import TextField from './TextField'
import Checkbox from './Checkbox'
import Question from './Question'


const PureQuestion = onlyUpdateForKeys(['value'])(Question)


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


export default ({ value, setValue }) => <div className='main-container-padding' style={ style.mainContainer }>
	<form style={ style.form }>
		<h1 style={ style.title }><FormattedMessage id='createQuestionnaire' /></h1>
		
		<TextField
				label={ <FormattedMessage id='questionnaireName' /> }
				value={ value.questionnaireName }
				onChange={ onTitleChange(setValue) }
		/>
		
		<Checkbox
				label={ <FormattedMessage id='published' /> }
				value={ !!value.published }
				onChange={ onPublishedChange(setValue) }
		/>
		
		{ value.questions.map((question, index) => <PureQuestion
				key={ index }
				number={ index + 1 }
				style={ style.question }
				value={ question }
				onChange={ onQuestionChange(setValue, index) }
		/>) }
	</form>
</div>
