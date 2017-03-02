import React from 'react';
import { Card, CardTitle, CardText, IconButton } from 'material-ui';
import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '/imports/client/ui/components/LoadingIndicator';
import ExamsResultsForUserTable from './ExamsResultsForUserTable';
import csvExport from '/imports/client/csv-export';
import dateJsToCsv from '/imports/client/date-js-to-csv';


const exportExamResults = examResults => {
	const examResultsWithTransformedDate = examResults.map(({ examTimestamp, _id, examId, userId, ...rest }) => ({
		...rest,
		date: dateJsToCsv(examTimestamp)
	}));
	
	csvExport('exam-results.csv', examResultsWithTransformedDate);
};


const style = {
	downloadButton: {
		verticalAlign: 'bottom',
		height: '40px'
	},
	
	cardText: {
		padding: '0'
	}
};


export default ({ loading, examResults }) => {
	if(loading) {
		return <LoadingIndicator />;
	}
	
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
	
	const handleDownloadButtonClick = () => {
		exportExamResults(examResults);
	};
	
	return <Card>
		<CardTitle title={
			<span>
				<FormattedMessage id='examResults' />
				<IconButton style={ style.downloadButton }
						onClick={ handleDownloadButtonClick }><DownloadIcon /></IconButton>
			</span>
		} />
		<CardText style={ style.cardText }>
			<ExamsResultsForUserTable examResults={ examResults } />
		</CardText>
	</Card>
};