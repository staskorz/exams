import React from 'react'

import enhance from './enhance'
import Form from './Form'


const EnhancedForm = enhance(Form)


export default () => <EnhancedForm />
