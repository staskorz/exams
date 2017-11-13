import { reduxForm } from 'redux-form'

import validate from '../../../../../common/validations/exam'


export default reduxForm({
	form: 'createExam',
	validate,
	enableReinitialize: true,
})
