import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router-dom'

import { neutral } from '../../util/colors'
import formatDate from '../../util/date-js-to-formatted'


const style = {
	actionLink: {
		color: neutral,
	},
}


export default ({ exams, intl: { formatMessage } }) => {
	const translatedExamName = formatMessage({ id: 'examName' })
	const translatedPublished = formatMessage({ id: 'published' })
	const translatedCreationTime = formatMessage({ id: 'creationTime' })
	const translatedModificationTime = formatMessage({ id: 'modificationTime' })
	const translatedActions = formatMessage({ id: 'actions' })
	const translatedEdit = formatMessage({ id: 'edit' })
	const translatedResults = formatMessage({ id: 'results' })
	const translatedTakeExam = formatMessage({ id: 'takeExam' })
	const translatedYes = formatMessage({ id: 'yes' })
	
	const actionsCellRenderer = ({ rowData }) => <span>
		<Link style={ style.actionLink } to={ '/edit-exam/' + rowData._id }>{ translatedEdit }</Link>
		
		&nbsp;
		
		<Link style={ style.actionLink } to={ '/exam-results/' + rowData._id }>{ translatedResults }</Link>
		
		&nbsp;
		
		{ rowData.published ?
				<Link style={ style.actionLink }
						to={ '/take-exam/' + rowData._id }>{ translatedTakeExam }</Link> : null
		}
	</span>
	
	const publishedCellRenderer = ({ cellData }) => cellData ? translatedYes : null
	
	const dateCellRenderer = ({ cellData }) => formatDate(cellData)
	
	const numColumns = 5
	
	return <WindowScroller>
		{ ({ height, isScrolling, scrollTop }) => <AutoSizer disableHeight>
			{ ({ width }) => <Table
					rowCount={ exams.length }
					rowGetter={ ({ index }) => exams[index] }
					rowHeight={ 48 }
					headerHeight={ 58 }
					width={ width }
					height={ height }
					scrollTop={ scrollTop }
					autoHeight
			>
				<Column dataKey='name' label={ translatedExamName } width={ width / numColumns } />
				
				<Column
						dataKey='published'
						label={ translatedPublished }
						width={ width / numColumns }
						cellRenderer={ publishedCellRenderer }
				/>
				
				<Column
						dataKey='createdAt'
						label={ translatedCreationTime }
						width={ width / numColumns }
						cellRenderer={ dateCellRenderer }
				/>
				
				<Column
						dataKey='updatedAt'
						label={ translatedModificationTime }
						width={ width / numColumns }
						cellRenderer={ dateCellRenderer }
				/>
				
				<Column
						dataKey='actions'
						label={ translatedActions }
						width={ width / numColumns }
						cellRenderer={ actionsCellRenderer }
				/>
			</Table> }
		</AutoSizer> }
	</WindowScroller>
}
