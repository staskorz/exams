import { withStateHandlers } from 'recompose'

import validate from '../../../common/validations/exam'


export default withStateHandlers(({ exam, intl: { formatMessage } }) => ({
	value: exam,
	modified: false,
	submitting: false,
	...validate(exam, formatMessage),
}), {
	onChange: (_, { intl: { formatMessage } }) => value => ({
		value,
		modified: true,
		...validate(value, formatMessage),
	}),
	
	setModified: () => modified => ({
		modified,
	}),
	
	setSubmitting: () => submitting => ({
		submitting,
	}),
})
