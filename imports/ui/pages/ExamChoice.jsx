import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, FlatButton } from 'material-ui';
import { withRouter } from 'react-router';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


const showCheckboxes = false;


const style = {
	button: {
		textDecoration: 'underline'
	}
};


const ExamChoice = ({ ready, exams, router }) => (
		{ ready } ?
				
				<Table selectable={ false }>
					<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Number</TableHeaderColumn>
							<TableHeaderColumn>&nbsp;</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={ showCheckboxes }>
						{ exams.map((exam, index) => (
								<TableRow key={ index }>
									<TableRowColumn>{ exam.name }</TableRowColumn>
									<TableRowColumn>{ exam.number }</TableRowColumn>
									<TableRowColumn>
										<FlatButton style={ style.button } onClick={ () => router.push('/take-exam/' + exam._id) } label={ 'Take Exam' } />
									</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
				
				: <LoadingIndicator />
);


export default withRouter(ExamChoice);
