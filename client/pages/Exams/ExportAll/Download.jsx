import React from 'react'

import Download from '../../../components/Download'


export default ({ allResults }) => <Download generate={ () => allResults } filename={ 'all-exam-results.csv' } />
