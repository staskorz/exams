import { reduxForm } from 'redux-form'

import validate from '../../../../../common/validations/exam'


const reduxFormValidate = (value, { intl: { formatMessage } }) => {
	if(!value || Object.keys(value).length === 0) {
		return
	} else if(!value.questions || value.questions.some(({ answers }) => !answers)) {
		return
	}
	
	const { errors } = validate(value, formatMessage)
	
	return errors
}


export default reduxForm({
	form: 'createExam',
	validate: reduxFormValidate,
	enableReinitialize: true,
})
