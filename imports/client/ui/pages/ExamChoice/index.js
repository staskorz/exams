import React from 'react'

import enhance from './enhance'
import Table from './Table'


const EnhancedTable = enhance(Table)


export default () => <EnhancedTable />
