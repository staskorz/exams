import React from 'react'
import { FormattedMessage } from 'react-intl'

import TextField from './TextField'
import Checkbox from './Checkbox'
import Question from './Question'


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
		
		{ value.questions.map((question, index) => <Question
				key={ index }
				number={ index + 1 }
				style={ style.question }
				value={ question }
		/>) }
	</form>
</div>
