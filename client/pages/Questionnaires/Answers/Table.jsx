import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router-dom'

import formatDate from '../../../util/date-js-to-formatted'
import { primary } from '../../../util/colors'


const style = {
	questionnaireName: {
		color: primary,
	},
}


export default ({ questionnaireAnswers, intl: { formatMessage } }) => {
	const translatedQuestionnaireName = formatMessage({ id: 'questionnaireName' })
	const translatedName = formatMessage({ id: 'name' })
	const translatedEmployeeId = formatMessage({ id: 'employeeId' })
	const translatedUsername = formatMessage({ id: 'username' })
	const translatedDate = formatMessage({ id: 'date' })
	
	const dateCellRenderer = ({ cellData }) => formatDate(cellData)
	
	const questionnaireNameCellRenderer = ({ rowData: { questionnaireName, questionnaireId } }) => <Link
			style={ style.questionnaireName }
			to={ '/questionnaires/edit/' + questionnaireId }>{ questionnaireName }
	</Link>
	
	const numColumns = 5
	
	return <WindowScroller>
		{ ({ height, isScrolling, scrollTop }) => <AutoSizer disableHeight>
			{ ({ width }) => <Table
					rowCount={ questionnaireAnswers.length }
					rowGetter={ ({ index }) => questionnaireAnswers[index] }
					rowHeight={ 48 }
					headerHeight={ 58 }
					width={ width }
					height={ height }
					scrollTop={ scrollTop }
					autoHeight
			>
				<Column dataKey='hebrewName' label={ translatedName } width={ width / numColumns } />
				
				<Column dataKey='employeeId' label={ translatedEmployeeId } width={ width / numColumns } />
				
				<Column dataKey='username' label={ translatedUsername } width={ width / numColumns } />
				
				<Column
						dataKey='timestamp'
						label={ translatedDate }
						width={ width / numColumns }
						cellRenderer={ dateCellRenderer }
				/>
				
				<Column
						dataKey='questionnaireName'
						label={ translatedQuestionnaireName }
						width={ width / numColumns }
						cellRenderer={ questionnaireNameCellRenderer }
				/>
			</Table> }
		</AutoSizer> }
	</WindowScroller>
}
