import { withStateHandlers } from 'recompose'


export default withStateHandlers(
		{
			questionNumber: 1,
		},
		
		{
			goToNextQuestion: ({ questionNumber }) => ({
				questionNumber: questionNumber + 1,
			}),
			
			goToPrevQuestion: ({ questionNumber }) => ({
				questionNumber: questionNumber - 1,
			}),
		},
)
