import React from 'react'

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


export default ({ questionnaire: { name, description, questions } }) => <form style={ style.form }>
	<h1 style={ style.title }>{ name }</h1>
	
	<pre style={ style.description }>{ description }</pre>
	
	{ questions.map((question, index) => <Question
			key={ index }
			question={ question }
			number={ index + 1 }
			total={ questions.length }
	/>) }
</form>
