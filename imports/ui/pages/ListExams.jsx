import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';


const showCheckboxes = false;


export default ({ ready, exams }) => (
		{ ready } ?
				
				<Table>
					<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Number</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={ showCheckboxes }>
						{ exams.map((exam, index) => (
								<TableRow key={ index }>
									<TableRowColumn>{ exam.name }</TableRowColumn>
									<TableRowColumn>{ exam.number }</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
				
				: <div>Loading...</div>
);
