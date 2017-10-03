import React from 'react'

import replaceArrayElement from '../../../../replace-array-element'

import Question from './Question'


const style = {
	form: {
		backgroundColor: 'white',
	},
	
	title: {
		margin: '0',
	},
	
	description: {
		marginRight: '17px',
		marginBottom: '32px',
		fontFamily: 'Roboto, sans-serif',
	},
}


const onQuestionChange = (setValue, questionIndex) => value => {
	setValue(prev => replaceArrayElement(prev, questionIndex, value))
}


export default ({ questionnaire: { name, description, questions }, value, setValue, errors }) => <form
		style={ style.form }
>
	<h1 style={ style.title }>{ name }</h1>
	
	<pre style={ style.description }>{ description }</pre>
	
	{ questions.map((question, index) => <Question
			key={ index }
			question={ question }
			number={ index + 1 }
			total={ questions.length }
			value={ value[index] }
			onChange={ onQuestionChange(setValue, index) }
			errors={ errors[index] }
	/>) }
</form>
