import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import ColoredExamMark from '/imports/client/ui/components/ColoredExamMark';
import dateFormat from '/imports/client/date-js-to-formatted';
import * as colors from '/imports/client/ui/colors';


const style = {
	link: {
		color: colors.primary,
	},
};


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
		{ examResults.map(({ hebrewName, employeeId, username, examTimestamp, mark, examName, _id, userId }, index) => (
				<TableRow key={ index }>
					<TableRowColumn>
						<Link to={ '/user-results/' + userId } style={ style.link }>
							{ hebrewName }
						</Link>
					</TableRowColumn>
					<TableRowColumn>{ employeeId }</TableRowColumn>
					<TableRowColumn>{ username }</TableRowColumn>
					<TableRowColumn>
						{ examTimestamp ? dateFormat(examTimestamp) : '' }
					</TableRowColumn>
					<TableRowColumn>{ examName }</TableRowColumn>
					<TableRowColumn><ColoredExamMark mark={ mark } id={ _id } /></TableRowColumn>
				</TableRow>
		)) }
	</TableBody>
</Table>;
