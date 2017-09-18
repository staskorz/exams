import { compose, withStateHandlers } from 'recompose'
import { injectIntl } from 'react-intl'

import validate from './validate'
import withCancel from './with-cancel'
import withCreate from './with-create'


const initialFormValue = {
	name: 'TestQuestionnaire',
	published: true,
	
	questions: [
		{
			text: 'Question 1 Text',
			
			answers: [
				{
					text: 'Question 1 Answer 1 Text',
				},
				
				{
					text: 'Question 1 Answer 2 Text',
					freeText: true,
				},
				
				{
					text: 'Question 1 Answer 3 Text',
				},
			],
		},
		
		{
			text: 'Question 2 Text',
			multipleChoice: true,
			
			answers: [
				{
					text: 'Question 2 Answer 1 Text',
				},
				
				{
					text: 'Question 2 Answer 2 Text',
				},
				
				{
					text: 'Question 2 Answer 3 Text',
					freeText: true,
				},
			],
		},
		
		{
			text: 'Question 3 Text',
			multipleChoice: true,
			
			answers: [
				{
					text: 'Question 3 Answer 1 Text',
				},
				
				{
					text: 'Question 3 Answer 2 Text',
				},
				
				{
					text: 'Question 3 Answer 3 Text',
					freeText: true,
				},
			],
		},
		
		{
			text: 'Question 4 Text',
			multipleChoice: true,
			
			answers: [
				{
					text: 'Question 4 Answer 1 Text',
				},
				
				{
					text: 'Question 4 Answer 2 Text',
				},
				
				{
					text: 'Question 4 Answer 3 Text',
					freeText: true,
				},
			],
		},
	],
}


export default compose(
		withCancel,
		injectIntl,
		withStateHandlers(({ initialValue = initialFormValue, intl: { formatMessage } }) => ({
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
		}),
		withCreate,
)
