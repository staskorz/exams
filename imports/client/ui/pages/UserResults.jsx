import React from 'react';
import { withRouter } from 'react-router';

import withExamResultsForUser from '/imports/client/ui/containers/with-exams-results-for-user';
import ExamsResultsForUserTableWithHeader from '/imports/client/ui/components/ExamsResultsForUserTableWithHeader';


const ComposedTableWithHeader = withRouter(withExamResultsForUser(ExamsResultsForUserTableWithHeader));


export default () => <ComposedTableWithHeader />;
