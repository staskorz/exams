import React from 'react';
import { withRouter } from 'react-router';

import withExamResultsForUser from '/imports/client/ui/containers/with-exams-results-for-user';
import ExamsResultsTableWithHeader from '/imports/client/ui/components/ExamsResultsTableWithHeader';


const ComposedTableWithHeader = withRouter(withExamResultsForUser(ExamsResultsTableWithHeader));


export default () => <ComposedTableWithHeader />;
