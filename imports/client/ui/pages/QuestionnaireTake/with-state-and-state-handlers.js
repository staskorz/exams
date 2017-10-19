import { withStateHandlers } from 'recompose'

import validate from './validate'


export default withStateHandlers(({ initialValue, questionnaire, intl: { formatMessage } }) => ({
	value: initialValue,
	...validate(initialValue, questionnaire, formatMessage),
	submitted: false,
}), {
	setValue: ({ value }, { questionnaire, intl: { formatMessage } }) => fn => {
		const newValue = fn(value)
		
		return {
			value: newValue,
			...validate(newValue, questionnaire, formatMessage),
		}
	},
	
	setSubmitted: () => () => ({
		submitted: true,
	}),
})
