import React from 'react';

import EditExamContainer from '/imports/ui/containers/EditExamContainer';


export default ({ routeParams: { examId } }) => (
		<EditExamContainer examId={ examId } />
);
