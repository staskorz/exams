import React from 'react';

import ExamEditContainer from '/imports/client/ui/containers/ExamEditContainer';


export default ({ routeParams: { examId }, ...rest }) => (
		<ExamEditContainer examId={ examId } { ...rest } />
);
