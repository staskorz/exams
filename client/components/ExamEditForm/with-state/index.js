import { withStateHandlers } from 'recompose'

import validate from '../../../../common/validations/exam'

import isAutoWeight from './is-auto-weight'


export default withStateHandlers(({ exam, initialAutoWeight, intl: { formatMessage } }) => ({
	value: exam,
	modified: false,
	submitting: false,
	autoWeight: initialAutoWeight ? true : isAutoWeight(exam),
	...validate(exam, formatMessage, true),
}), {
	onChange: ({ autoWeight }, { intl: { formatMessage } }) => value => ({
		value,
		modified: true,
		...validate(value, formatMessage, autoWeight),
	}),
	
	setModified: () => modified => ({
		modified,
	}),
	
	setSubmitting: () => submitting => ({
		submitting,
	}),
	
	onAutoWeightChange: ({ value }, { intl: { formatMessage } }) => autoWeight => ({
		autoWeight,
		modified: true,
		...validate(value, formatMessage, autoWeight),
	}),
})
