import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ListIcon from 'material-ui/svg-icons/action/view-headline';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';


const showCheckboxes = false;


export default ({ ready, users }) => {
	if(!ready) {
		return <LoadingIndicator />;
	}
	
	return <Table selectable={ false }>
		<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
			<TableRow>
				<TableHeaderColumn><FormattedMessage id='name' /></TableHeaderColumn>
				<TableHeaderColumn><FormattedMessage id='employeeId' /></TableHeaderColumn>
				<TableHeaderColumn><FormattedMessage id='username' /></TableHeaderColumn>
				<TableHeaderColumn><FormattedMessage id='actions' /></TableHeaderColumn>
			</TableRow>
		</TableHeader>
		<TableBody displayRowCheckbox={ showCheckboxes }>
			{ users.map(({ hebrewName, employeeId, username }, index) => (
					<TableRow key={ index }>
						<TableRowColumn>{ hebrewName }</TableRowColumn>
						<TableRowColumn>{ employeeId }</TableRowColumn>
						<TableRowColumn>{ username }</TableRowColumn>
						<TableRowColumn>
							<IconButton><ListIcon /></IconButton>
							<IconButton><DeleteIcon /></IconButton>
						</TableRowColumn>
					</TableRow>
			)) }
		</TableBody>
	</Table>;
};
