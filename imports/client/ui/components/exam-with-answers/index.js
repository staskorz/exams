import React from 'react'

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';
import Header from './Header'
import Question from './Question'
import transform from './transform'


const style = {
	mainContainer: {
		padding: '32px',
		background: 'white',
	},
}


export default ({ loading, answers, exam, user }) => {
	if(loading) {
		return <LoadingIndicator />
	}
	
	const headerProps = { answers, exam, user }
	
	const answeredQuestions = transform(exam.questions, answers.questions)
	
	return <div style={ style.mainContainer }>
		<Header { ...headerProps } />
		
		{ answeredQuestions.map(({ text, correct, weight, variants }, index) => <Question
				key={ index }
				number={ index + 1 }
				text={ text }
				correct={ correct }
				weight={ weight }
				variants={ variants }
		/>) }
	</div>
}
