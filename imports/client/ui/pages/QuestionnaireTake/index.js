import React from 'react'

import Form from './Form'
import enhance from './enhance'


const EnhancedForm = enhance(Form)


export default () => <EnhancedForm />
