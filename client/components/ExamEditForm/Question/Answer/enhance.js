import { withHandlers } from 'recompose'


export default withHandlers({
	onTextChange: ({ value, onChange }) => newText => {
		const { text, ...rest } = value
		
		onChange({
			text: newText,
			...rest,
		})
	},
	
	onCorrectChange: ({ value, onChange }) => newCorrect => {
		const { correct, ...rest } = value
		
		onChange({
			correct: !!newCorrect,
			...rest,
		})
	},
})
