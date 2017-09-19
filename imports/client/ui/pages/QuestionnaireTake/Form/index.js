import React from 'react'


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
</form>
