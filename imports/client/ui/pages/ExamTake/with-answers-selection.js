import { withStateHandlers } from 'recompose'

import replaceArrayElement from '../../../replace-array-element'


export default withStateHandlers(
		({ exam: { questions } }) => ({
			answers: questions.map(({ answers }) => new Array(answers.length).fill(false)),
		}),
		
		{
			answerSelectionHandler: ({ answers }, { questionNumber, exam }) => (e, isChecked) => {
				const answerNumber = parseInt(e.target.name)
				
				return {
					answers: replaceArrayElement(answers, questionNumber, replaceArrayElement(answers[questionNumber], answerNumber, !!isChecked)),
				}
			},
		},
)
