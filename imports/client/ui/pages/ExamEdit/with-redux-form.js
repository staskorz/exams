import { reduxForm } from 'redux-form'

import validate from './validate'


export default reduxForm({
	form: 'createExam',
	validate,
	enableReinitialize: true,
})
