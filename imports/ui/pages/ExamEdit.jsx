import React from 'react';

import ExamEditContainer from '/imports/ui/containers/ExamEditContainer';


export default ({ routeParams: { examId } }) => (
		<ExamEditContainer examId={ examId } />
);
