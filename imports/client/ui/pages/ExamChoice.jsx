import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, FlatButton } from 'material-ui';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';


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
							<TableHeaderColumn><FormattedMessage id='examName' /></TableHeaderColumn>
							<TableHeaderColumn>&nbsp;</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={ showCheckboxes }>
						{ exams.map((exam, index) => (
								<TableRow key={ index }>
									<TableRowColumn>{ exam.name }</TableRowColumn>
									<TableRowColumn>
										<FlatButton style={ style.button } onClick={ () => router.push('/take-exam/' + exam._id) } label={ <FormattedMessage id='takeExam' /> } />
									</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
				
				: <LoadingIndicator />
);


export default withRouter(ExamChoice);
