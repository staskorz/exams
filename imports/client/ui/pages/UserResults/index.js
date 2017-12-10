import React from 'react'

import dateJsToCsv from '../../../date-js-to-csv'
import Download from '../../components/Download'

import enhance from './enhance'
import Table from './Table'


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
