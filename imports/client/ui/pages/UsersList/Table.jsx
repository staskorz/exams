import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router'

import { neutral } from '../../../../../client/util/colors'


const style = {
	actionLink: {
		color: neutral,
	},
}


export default ({ users, intl: { formatMessage } }) => {
	const translatedName = formatMessage({ id: 'name' })
	const translatedEmployeeId = formatMessage({ id: 'employeeId' })
	const translatedUsername = formatMessage({ id: 'username' })
	const translatedMarks = formatMessage({ id: 'marks' })
	const translatedActions = formatMessage({ id: 'actions' })
	const translatedRoles = formatMessage({ id: 'roles' })
	const translatedOperator = formatMessage({ id: 'operator' })
	
	const actionsCellRenderer = ({ rowData }) => <Link style={ style.actionLink } to={ '/user-results/' + rowData._id }>
		{ translatedMarks }
	</Link>
	
	const rolesCellRenderer = ({ rowData: { role } }) => role === 'operator' ? translatedOperator : null
	
	const numColumns = 5
	
	return <WindowScroller>
		{ ({ height, isScrolling, scrollTop }) => <AutoSizer disableHeight>
			{ ({ width }) => <Table
					rowCount={ users.length }
					rowGetter={ ({ index }) => users[index] }
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
						dataKey='roles'
						label={ translatedRoles }
						width={ width / numColumns }
						cellRenderer={ rolesCellRenderer }
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
