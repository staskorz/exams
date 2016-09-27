import React, { Component } from 'react';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn } from 'material-ui';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';


export default class ExamResults extends Component {
	render() {
		const { ready } = this.props;
		
		if(!ready) {
			return <LoadingIndicator />;
		}
		
		const { examResults } = this.props;
		
		const showCheckboxes = false;
		
		return (
				<Table selectable={ false }>
					<TableHeader displaySelectAll={ showCheckboxes } adjustForCheckbox={ showCheckboxes }>
						<TableRow>
							<TableHeaderColumn><FormattedMessage id='username' /></TableHeaderColumn>
							<TableHeaderColumn><FormattedMessage id='date' /></TableHeaderColumn>
							<TableHeaderColumn><FormattedMessage id='mark' /></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={ showCheckboxes }>
						{ examResults.map(({ username, examTimestamp, mark }, index) => (
								<TableRow key={ index }>
									<TableRowColumn>{ username }</TableRowColumn>
									<TableRowColumn>
										{ examTimestamp ?
												<span>
													<FormattedTime value={ examTimestamp } />
													&nbsp;
													<FormattedDate value={ examTimestamp } />
												</span>
												
												:
												
												''
										}
									</TableRowColumn>
									<TableRowColumn>{ mark }</TableRowColumn>
								</TableRow>
						)) }
					</TableBody>
				</Table>
		);
	}
};
