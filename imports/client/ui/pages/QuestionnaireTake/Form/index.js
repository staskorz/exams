import React from 'react'

import Question from './Question'


const style = {
	form: {
		backgroundColor: 'white',
	},
	
	title: {
		margin: '0',
	},
}


export default ({ questionnaire: { name, questions } }) => <form style={ style.form }>
	<h1 style={ style.title }>{ name }</h1>
	
	{ questions.map((question, index) => <Question
			key={ index }
			question={ question }
			number={ index + 1 }
			total={ questions.length }
	/>) }
</form>
