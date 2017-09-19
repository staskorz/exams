import React from 'react'

import enhance from './enhance'
import Form from '../../components/QuestionnaireEditForm'


const EnhancedForm = enhance(Form)


export default () => <EnhancedForm />
