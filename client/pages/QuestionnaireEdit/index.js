import React from 'react'

import enhance from './enhance'
import Form from '../../components/QuestionnaireEditForm/index'


const EnhancedForm = enhance(Form)


export default () => <EnhancedForm />
