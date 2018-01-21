import { reduxForm } from 'redux-form'

import validate from '../../../../common/validations/exam'


const reduxFormValidate = (value, { intl: { formatMessage } }) => {
	const { errors } = validate(value, formatMessage)
	
	return errors
}


export default reduxForm({
	form: 'createExam',
	validate: reduxFormValidate,
	enableReinitialize: true,
})
