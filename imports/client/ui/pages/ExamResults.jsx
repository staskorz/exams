import React, { Component } from 'react';
import { Card, CardTitle, CardText, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import moment from 'moment';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';
import csvExport from '/imports/client/csv-export';


export default class ExamResults extends Component {
	style = {
		downloadButton: {
			verticalAlign: 'bottom',
			height: '40px'
		},
		
		cardText: {
			padding: '0'
		}
	};
	
	
	jsDateToCsvDate = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
	
	
	handleDownloadButtonClick = () => {
		const { examResults } = this.props;
		
		const examResultsWithTransformedDate = examResults.map(({ examTimestamp, _id, ...rest }) => ({
			...rest,
			date: this.jsDateToCsvDate(examTimestamp)
		}));
		
		csvExport('exam-results.csv', examResultsWithTransformedDate);
	};
	
	
	render() {
		const { ready } = this.props;
		
		if(!ready) {
			return <LoadingIndicator />;
		}
		
		const { examResults } = this.props;
		
		if(!examResults.length) {
			return (
					<Card>
						<CardTitle title={
							<span>
							<FormattedMessage id='noExamResultsYet' />
						</span>
						} />
					</Card>
			);
		}
		
		const showCheckboxes = false;
		
		return (
				<Card>
					<CardTitle title={
						<span>
							<FormattedMessage id='examResults' />
							<IconButton style={ this.style.downloadButton } onClick={ this.handleDownloadButtonClick }><DownloadIcon /></IconButton>
						</span>
					} />
					<CardText style={ this.style.cardText }>
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
					</CardText>
				</Card>
		);
	}
};
