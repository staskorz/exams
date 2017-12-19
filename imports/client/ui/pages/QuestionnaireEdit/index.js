import React from 'react'

import enhance from './enhance'
import Form from '../../../../../client/components/QuestionnaireEditForm'


const EnhancedForm = enhance(Form)


export default () => <EnhancedForm />
