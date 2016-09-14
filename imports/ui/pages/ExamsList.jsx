import React from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import { withRouter } from 'react-router';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

import LoadingIndicator from '/imports/ui/components/LoadingIndicator';


const showCheckboxes = false;


const ListExams = ({ ready, exams, router }) => (
		{ ready } ?
				
				<Table selectable={ false }>
					<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
						<TableRow>
							<TableHeaderColumn><FormattedMessage id='examName' /></TableHeaderColumn>
							<TableHeaderColumn><FormattedMessage id='published' /></TableHeaderColumn>
							<TableHeaderColumn><FormattedMessage id='creationTime' /></TableHeaderColumn>
							<TableHeaderColumn><FormattedMessage id='modificationTime' /></TableHeaderColumn>
							<TableHeaderColumn><FormattedMessage id='actions' /></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={ showCheckboxes }>
						{ exams.map((exam, index) => (
								<TableRow key={ index }>
									<TableRowColumn>{ exam.name }</TableRowColumn>
									<TableRowColumn>{ exam.published ? <CheckIcon /> : '' }</TableRowColumn>
									<TableRowColumn>
										{ exam.createdAt ?
												<span>
													<FormattedTime value={ exam.createdAt } />
													&nbsp;
													<FormattedDate value={ exam.createdAt } />
												</span>
												
												:
												
												''
										}
									</TableRowColumn>
									<TableRowColumn>
										{ exam.updatedAt ?
												<span>
													<FormattedTime value={ exam.updatedAt } />
													&nbsp;
													<FormattedDate value={ exam.updatedAt } />
												</span>
												
												:
												
												''
										}
									</TableRowColumn>
									<TableRowColumn>
										<IconButton onClick={ () => router.push('/edit-exam/' + exam._id) }><EditIcon /></IconButton>
										<IconButton onClick={ () => router.push('/take-exam/' + exam._id) }
													disabled={ !exam.published }><AssignmentIcon /></IconButton>
										<IconButton onClick={ () => router.push('/exam-results/' + exam._id) }><PeopleIcon /></IconButton>
									</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
				
				: <LoadingIndicator />
);


export default withRouter(ListExams);
