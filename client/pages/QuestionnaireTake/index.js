import React from 'react'

import Form from './Form/index'
import enhance from './enhance'


const EnhancedForm = enhance(Form)


export default () => <EnhancedForm />
