import React from 'react';

import ExamEditContainer from '/imports/client/ui/containers/ExamEditContainer';


export default ({ routeParams: { examId } }) => (
		<ExamEditContainer examId={ examId } />
);
