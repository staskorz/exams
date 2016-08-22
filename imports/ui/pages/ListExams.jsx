import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import SearchIcon from 'material-ui/svg-icons/action/search';


const showCheckboxes = false;


export default ({ ready, exams }) => (
		{ ready } ?
				
				<Table>
					<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Number</TableHeaderColumn>
							<TableHeaderColumn>Actions</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={ showCheckboxes }>
						{ exams.map((exam, index) => (
								<TableRow key={ index }>
									<TableRowColumn>{ exam.name }</TableRowColumn>
									<TableRowColumn>{ exam.number }</TableRowColumn>
									<TableRowColumn>
										<IconButton><EditIcon /></IconButton>
										<IconButton><SearchIcon /></IconButton>
									</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
				
				: <div>Loading...</div>
);
