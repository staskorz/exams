import React from 'react'

import dateJsToCsv from '../../../../../client/util/date-js-to-csv'
import Download from '../../../../../client/components/Download'
import Table from '../../../../../client/components/ExamResultsTable'

import enhance from './enhance'


const generate = examResults => () => examResults.map(({ examTimestamp, _id, examId, userId, ...rest }) => ({
	...rest,
	date: dateJsToCsv(examTimestamp),
}))


export default enhance(props => <div>
	<div>
		<Download generate={ generate(props.examResults) } filename={ 'exam-results.csv' } />
	</div>
	
	<Table { ...props } />
</div>)
