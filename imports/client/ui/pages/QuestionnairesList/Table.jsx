import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router'

import { neutral } from '../../colors'
import LoadingIndicator from '../../components/LoadingIndicator'
import formatDate from '../../../date-js-to-formatted'


const style = {
	actionLink: {
		color: neutral,
	},
}


export default ({ loading, questionnaires, intl: { formatMessage } }) => {
	if(loading) {
		return <LoadingIndicator />
	}
	
	const translatedQuestionnaireName = formatMessage({ id: 'questionnaireName' })
	const translatedPublished = formatMessage({ id: 'published' })
	const translatedCreationTime = formatMessage({ id: 'creationTime' })
	const translatedModificationTime = formatMessage({ id: 'modificationTime' })
	const translatedActions = formatMessage({ id: 'actions' })
	const translatedEdit = formatMessage({ id: 'edit' })
	const translatedYes = formatMessage({ id: 'yes' })
	
	const actionsCellRenderer = ({ rowData }) => <Link style={ style.actionLink }
			to={ '/edit-questionnaire/' + rowData._id }>
		{ translatedEdit }
	</Link>
	
	const publishedCellRenderer = ({ cellData }) => cellData ? translatedYes : null
	
	const dateCellRenderer = ({ cellData }) => formatDate(cellData)
	
	const numColumns = 5
	
	return <WindowScroller>
		{ ({ height, isScrolling, scrollTop }) => <AutoSizer disableHeight>
			{ ({ width }) => <Table
					rowCount={ questionnaires.length }
					rowGetter={ ({ index }) => questionnaires[index] }
					rowHeight={ 48 }
					headerHeight={ 58 }
					width={ width }
					height={ height }
					scrollTop={ scrollTop }
					autoHeight
			>
				<Column dataKey='name' label={ translatedQuestionnaireName } width={ width / numColumns } />
				
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
