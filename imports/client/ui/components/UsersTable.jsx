import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import ListIcon from 'material-ui/svg-icons/editor/format-list-bulleted';
import { pink50 } from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';


const showCheckboxes = false;


const style = {
	operator: {
		background: pink50,
		fontWeight: 'bold'
	}
};


const UsersTable = ({ ready, users, router }) => {
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
			{ users.map(({ _id, hebrewName, employeeId, username, role }, index) => (
					<TableRow key={ index } style={ role === 'operator' ? style.operator : null }>
						<TableRowColumn>{ hebrewName }</TableRowColumn>
						<TableRowColumn>{ employeeId }</TableRowColumn>
						<TableRowColumn>{ username }</TableRowColumn>
						<TableRowColumn>
							<IconButton onClick={ () => router.push('/user-results/' + _id) }><ListIcon /></IconButton>
						</TableRowColumn>
					</TableRow>
			)) }
		</TableBody>
	</Table>;
};


export default withRouter(UsersTable);
