import React from 'react'
import { FormattedMessage } from 'react-intl'

import formatDate from '../../../../../../client/util/date-js-to-formatted'


const style = {
	descriptionText: {
		fontSize: '16px',
		fontWeight: 'normal',
		lineHeight: '36px',
		color: 'rgba(0, 0, 0, 0.870588)',
		width: '200px',
		display: 'inline-block',
	},
	
	mainText: {
		fontSize: '24px',
		fontWeight: 'normal',
		lineHeight: '36px',
		color: 'rgba(0, 0, 0, 0.870588)',
		display: 'inline-block',
	},
}


const Description = ({ id }) => <span style={ style.descriptionText }>
	<FormattedMessage id={ id } />:
</span>

const Main = ({ children }) => <span style={ style.mainText }>
	{ children }
</span>


export default ({
					answers: { examTimestamp, mark, questions: answeredQuestions },
					exam: { name: examName, questions },
					user: { employeeId, username, hebrewName },
				}) => <div>
	<Description id='examName' /><Main>{ examName }</Main><br />
	<Description id='date' /><Main>{ formatDate(examTimestamp) }</Main><br />
	<Description id='employeeName' /><Main>{ hebrewName }</Main><br />
	<Description id='employeeId' /><Main>{ employeeId }</Main><br />
	<Description id='mark' /><Main>{ mark }</Main><br />
</div>
