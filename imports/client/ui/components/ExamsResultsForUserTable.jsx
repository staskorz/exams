import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import { FormattedMessage, FormattedTime, FormattedDate } from 'react-intl';

import ColoredExamMark from '/imports/client/ui/components/ColoredExamMark';


const showCheckboxes = false;


export default ({ examResults }) => <Table selectable={ false }>
	<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
		<TableRow>
			<TableHeaderColumn><FormattedMessage id='name' /></TableHeaderColumn>
			<TableHeaderColumn><FormattedMessage id='employeeId' /></TableHeaderColumn>
			<TableHeaderColumn><FormattedMessage id='username' /></TableHeaderColumn>
			<TableHeaderColumn><FormattedMessage id='date' /></TableHeaderColumn>
			<TableHeaderColumn><FormattedMessage id='examName' /></TableHeaderColumn>
			<TableHeaderColumn><FormattedMessage id='mark' /></TableHeaderColumn>
		</TableRow>
	</TableHeader>
	<TableBody displayRowCheckbox={ showCheckboxes }>
		{ examResults.map(({ hebrewName, employeeId, username, examTimestamp, mark, examName }, index) => (
				<TableRow key={ index }>
					<TableRowColumn>{ hebrewName }</TableRowColumn>
					<TableRowColumn>{ employeeId }</TableRowColumn>
					<TableRowColumn>{ username }</TableRowColumn>
					<TableRowColumn>
						{ examTimestamp ?
								<span>
													<FormattedTime value={ examTimestamp } />
									&nbsp;
									<FormattedDate value={ examTimestamp } />
												</span>
								
								:
								
								''
						}
					</TableRowColumn>
					<TableRowColumn>{ examName }</TableRowColumn>
					<TableRowColumn><ColoredExamMark mark={ mark } /></TableRowColumn>
				</TableRow>
		)) }
	</TableBody>
</Table>;
