import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ViewIcon from 'material-ui/svg-icons/action/view-headline';
import { withRouter } from 'react-router';


const showCheckboxes = false;


const ListExams = ({ ready, exams, router }) => (
		{ ready } ?
				
				<Table selectable={ false }>
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
										<IconButton onClick={ () => router.push('/edit-exam/' + exam._id) }><EditIcon /></IconButton>
										<IconButton onClick={ () => router.push('/exam-results/' + exam._id) }><ViewIcon /></IconButton>
									</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
				
				: <div>Loading...</div>
);


export default withRouter(ListExams);
