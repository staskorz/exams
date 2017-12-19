import React from 'react'

import dateJsToCsv from '../../../../../client/util/date-js-to-csv'
import Download from '../../../../../client/components/Download'

import enhance from './enhance'
import Table from './Table'


const flattenQuestions = questions => questions.reduce((accQuestion, { answers }, questionIndex) => ({
	...accQuestion,
	...answers.reduce((accAnswer, { checked, freeText }, answerIndex) => ({
		...accAnswer,
		['q' + (questionIndex + 1) + 'a' + (answerIndex + 1) + 'c']: checked,
		['q' + (questionIndex + 1) + 'a' + (answerIndex + 1) + 't']: freeText,
	}), {}),
}), {})


const generate = questionnaireAnswers => () => questionnaireAnswers.map(({ timestamp, questions, userId, _id, questionnaireId, ...rest }) => ({
	timestamp: dateJsToCsv(timestamp),
	...rest,
	...flattenQuestions(questions),
}))


export default enhance(props => <div>
	<div>
		<Download
				generate={ generate(props.questionnaireAnswers) }
				filename={ props.intl.formatMessage({ id: 'questionnaireAnswers' }) + '.csv' }
		/>
	</div>
	
	<Table { ...props } />
</div>)
