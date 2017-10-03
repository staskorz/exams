import { withStateHandlers } from 'recompose'

import validate from './validate'


export default withStateHandlers(({ initialValue, intl: { formatMessage } }) => ({
	value: initialValue,
	...validate(initialValue, formatMessage),
}), {
	setValue: ({ value }, { intl: { formatMessage } }) => fn => {
		const newValue = fn(value)
		
		return {
			value: newValue,
			...validate(newValue, formatMessage),
		}
	},
})
