import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router'

import { neutral } from '../../util/colors'


const style = {
	actionLink: {
		color: neutral,
	},
}


export default ({ exams, intl: { formatMessage } }) => {
	const translatedExamName = formatMessage({ id: 'examName' })
	const translatedActions = formatMessage({ id: 'actions' })
	const translatedTakeExam = formatMessage({ id: 'takeExam' })
	
	const actionsCellRenderer = ({ rowData }) => <Link style={ style.actionLink }
			to={ '/take-exam/' + rowData._id }>{ translatedTakeExam }
	</Link>
	
	const numColumns = 2
	
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
						dataKey='actions'
						label={ translatedActions }
						width={ width / numColumns }
						cellRenderer={ actionsCellRenderer }
				/>
			</Table> }
		</AutoSizer> }
	</WindowScroller>
}
