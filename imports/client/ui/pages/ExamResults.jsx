import React from 'react';
import { withRouter } from 'react-router';

import withExamResults from '/imports/client/ui/containers/with-exams-results';
import ExamsResultsTableWithHeader from '/imports/client/ui/components/ExamsResultsTableWithHeader';


const ComposedTableWithHeader = withRouter(withExamResults(ExamsResultsTableWithHeader));


export default () => <ComposedTableWithHeader />;
