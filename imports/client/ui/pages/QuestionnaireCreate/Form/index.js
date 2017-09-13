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


export default () => <div className='main-container-padding' style={ style.mainContainer }>
	<form style={ style.form }>
		<h1 style={ style.title }><FormattedMessage id='createQuestionnaire' /></h1>
		
		<TextField label={ <FormattedMessage id='questionnaireName' /> } />
		<Checkbox label={ <FormattedMessage id='published' /> } />
		
		<Question number={ 1 } style={ style.question } />
	</form>
</div>
