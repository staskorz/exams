import React from 'react'

import transformExamServerToClient from '../../../../../../client/util/transform-exam-server-to-client'

import Header from './Header'
import Question from './Question'
import transform from './transform'


const style = {
	mainContainer: {
		padding: '32px',
		background: 'white',
	},
}


export default ({ answers, exam, user }) => {
	const headerProps = { answers, exam, user }
	
	const transformedExam = transformExamServerToClient(exam)
	
	const answeredQuestions = transform(transformedExam.questions, answers.questions)
	
	return <div style={ style.mainContainer }>
		<Header { ...headerProps } />
		
		{ answeredQuestions.map(({ text, correct, weight, images, variants }, index) => <Question
				key={ index }
				number={ index + 1 }
				text={ text }
				correct={ correct }
				weight={ weight }
				variants={ variants }
				images={ images }
		/>) }
	</div>
}
