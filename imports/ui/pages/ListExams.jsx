import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';


export default () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHeaderColumn>Name</TableHeaderColumn>
					<TableHeaderColumn>Number</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableRowColumn>Name1</TableRowColumn>
					<TableRowColumn>1</TableRowColumn>
				</TableRow>
				<TableRow>
					<TableRowColumn>Name2</TableRowColumn>
					<TableRowColumn>2</TableRowColumn>
				</TableRow>
				<TableRow>
					<TableRowColumn>Name3</TableRowColumn>
					<TableRowColumn>3</TableRowColumn>
				</TableRow>
			</TableBody>
		</Table>
);
