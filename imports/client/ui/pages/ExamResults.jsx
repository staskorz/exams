import React, { Component } from 'react';
import { Card, CardTitle, CardText, Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, IconButton } from 'material-ui';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';
import ColoredExamMark from '/imports/client/ui/components/ColoredExamMark';
import csvExport from '/imports/client/csv-export';
import dateJsToCsv from '/imports/client/date-js-to-csv';
import dateFormat from '/imports/client/date-js-to-formatted';


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
	
	
	handleDownloadButtonClick = () => {
		const { examResults } = this.props;
		
		const examResultsWithTransformedDate = examResults.map(({ examTimestamp, _id, ...rest }) => ({
			...rest,
			date: dateJsToCsv(examTimestamp)
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
									<TableHeaderColumn><FormattedMessage id='name' /></TableHeaderColumn>
									<TableHeaderColumn><FormattedMessage id='employeeId' /></TableHeaderColumn>
									<TableHeaderColumn><FormattedMessage id='username' /></TableHeaderColumn>
									<TableHeaderColumn><FormattedMessage id='date' /></TableHeaderColumn>
									<TableHeaderColumn><FormattedMessage id='mark' /></TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={ showCheckboxes }>
								{ examResults.map(({ hebrewName, employeeId, username, examTimestamp, mark }, index) => (
										<TableRow key={ index }>
											<TableRowColumn>{ hebrewName }</TableRowColumn>
											<TableRowColumn>{ employeeId }</TableRowColumn>
											<TableRowColumn>{ username }</TableRowColumn>
											<TableRowColumn>
												{ examTimestamp ? dateFormat(examTimestamp) : '' }
											</TableRowColumn>
											<TableRowColumn><ColoredExamMark mark={ mark } /></TableRowColumn>
										</TableRow>
								)) }
							</TableBody>
						</Table>
					</CardText>
				</Card>
		);
	}
};
