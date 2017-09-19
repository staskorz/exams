import { withStateHandlers } from 'recompose'

import validate from './validate'


const initialFormValue = {
	name: '',
	published: true,
	
	questions: [
		{
			text: '',
			
			answers: [
				{
					text: '',
				},
				
				{
					text: '',
				},
			],
		},
	],
}


export default withStateHandlers(({ initialValue = initialFormValue, intl: { formatMessage } }) => ({
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
