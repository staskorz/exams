import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router'

import formatDate from '../../../date-js-to-formatted'
import { primary } from '../../colors'


const style = {
	examName: {
		color: primary,
	},
}


export default ({ examResults, intl: { formatMessage } }) => {
	const translatedExamName = formatMessage({ id: 'examName' })
	const translatedName = formatMessage({ id: 'name' })
	const translatedEmployeeId = formatMessage({ id: 'employeeId' })
	const translatedUsername = formatMessage({ id: 'username' })
	const translatedDate = formatMessage({ id: 'date' })
	
	const dateCellRenderer = ({ cellData }) => formatDate(cellData)
	
	const examNameCellRenderer = ({ rowData: { examName, examId } }) => <Link
			style={ style.examName }
			to={ '/edit-exam/' + examId }>{ examName }
	</Link>
	
	const numColumns = 5
	
	return <WindowScroller>
		{ ({ height, isScrolling, scrollTop }) => <AutoSizer disableHeight>
			{ ({ width }) => <Table
					rowCount={ examResults.length }
					rowGetter={ ({ index }) => examResults[index] }
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
						dataKey='name'
						label={ translatedExamName }
						width={ width / numColumns }
						cellRenderer={ examNameCellRenderer }
				/>
			</Table> }
		</AutoSizer> }
	</WindowScroller>
}
