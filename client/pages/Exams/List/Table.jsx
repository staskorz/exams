import React from 'react'
import { WindowScroller, AutoSizer, Table, Column } from 'react-virtualized'
import { Link } from 'react-router-dom'

import { neutral } from '../../../util/colors'
import formatDate from '../../../util/date-js-to-formatted'
import Tags from './Tags/index'


const style = {
	actionLink: {
		color: neutral,
	},
	
	tagsAutoComplete: {
		width: '30px',
	},
}


const onSetPublishedCreator = (onSetPublished, examId) => ({ target: { checked } }) => {
	onSetPublished(examId, !!checked)
}


export default ({ exams, onSetPublished, availableTags, onTagsChange, intl: { formatMessage } }) => {
	const translatedExamName = formatMessage({ id: 'examName' })
	const translatedPublished = formatMessage({ id: 'published' })
	const translatedCreationTime = formatMessage({ id: 'creationTime' })
	const translatedModificationTime = formatMessage({ id: 'modificationTime' })
	const translatedActions = formatMessage({ id: 'actions' })
	const translatedEdit = formatMessage({ id: 'edit' })
	const translatedResults = formatMessage({ id: 'results' })
	const translatedTakeExam = formatMessage({ id: 'takeExam' })
	const translatedTags = formatMessage({ id: 'tags' })
	
	const tagsCellRenderer = ({ rowData: { _id, tags } }) => <Tags
			availableTags={ availableTags }
			examId={ _id }
			tags={ tags }
			onChange={ onTagsChange }
	/>
	
	const actionsCellRenderer = ({ rowData }) => <span>
		<Link style={ style.actionLink } to={ '/exams/edit/' + rowData._id }>{ translatedEdit }</Link>
		
		&nbsp;
		
		<Link style={ style.actionLink } to={ '/exams/results/' + rowData._id }>{ translatedResults }</Link>
		
		&nbsp;
		
		{ rowData.published ?
				<Link style={ style.actionLink }
						to={ '/exams/take/' + rowData._id }>{ translatedTakeExam }</Link> : null
		}
	</span>
	
	const publishedCellRenderer = ({ rowData: { published, _id } }) => <input
			type='checkbox'
			checked={ !!published }
			onChange={ onSetPublishedCreator(onSetPublished, _id) }
	/>
	
	const dateCellRenderer = ({ cellData }) => formatDate(cellData)
	
	const numColumns = 6
	
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
				<Column dataKey='name' label={ translatedExamName } width={ width / 100 * 17 } />
				
				<Column
						dataKey='tags'
						label={ translatedTags }
						width={ width / 100 * 42 }
						cellRenderer={ tagsCellRenderer }
				/>
				
				<Column
						dataKey='published'
						label={ translatedPublished }
						width={ width / 100 * 5 }
						cellRenderer={ publishedCellRenderer }
				/>
				
				<Column
						dataKey='createdAt'
						label={ translatedCreationTime }
						width={ width / 100 * 11 }
						cellRenderer={ dateCellRenderer }
				/>
				
				<Column
						dataKey='updatedAt'
						label={ translatedModificationTime }
						width={ width / 100 * 11 }
						cellRenderer={ dateCellRenderer }
				/>
				
				<Column
						dataKey='actions'
						label={ translatedActions }
						width={ width / 100 * 14 }
						cellRenderer={ actionsCellRenderer }
				/>
			</Table> }
		</AutoSizer> }
	</WindowScroller>
}
