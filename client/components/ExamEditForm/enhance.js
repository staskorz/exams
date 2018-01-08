import { compose, withHandlers } from 'recompose'
import removeArrayElement from '../../util/remove-array-element'
import replaceArrayElement from '../../util/replace-array-element'


export default compose(
		withHandlers({
			onNameChange: ({ value, onChange }) => newName => {
				const { name, ...rest } = value
				
				onChange({
					name: newName,
					...rest,
				})
			},
			
			onQuestionChange: ({ value, onChange }) => (question, index) => {
				const { questions, ...rest } = value
				
				onChange({
					...rest,
					questions: replaceArrayElement(questions, index, question),
				})
			},
			
			onQuestionAdd: ({ value, onChange }) => () => {
				const { questions, ...rest } = value
				
				onChange({
					...rest,
					questions: [...questions, {
						text: '',
						weight: 10,
						images: [null, null, null, null],
						answers: [
							{ text: '' },
							{ text: '' },
						],
					}],
				})
			},
			
			onQuestionRemove: ({ value, onChange }) => index => {
				const { questions, ...rest } = value
				
				onChange({
					...rest,
					questions: removeArrayElement(questions, index),
				})
			},
		}),
)
