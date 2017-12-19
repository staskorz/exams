import { withStateHandlers } from 'recompose'

import replaceArrayElement from '../../../../../client/util/replace-array-element'


const handleMultiSelection = replaceArrayElement


const handleRadioSelection = (answers, answerNumber, checked) => {
	if(checked) {
		return answers.map((_, index) => answerNumber === index)
	} else {
		return handleMultiSelection(answers, answerNumber, false)
	}
}


export default withStateHandlers(
		({ exam: { questions } }) => ({
			answers: questions.map(({ answers }) => new Array(answers.length).fill(false)),
		}),
		
		{
			answerSelectionHandler: ({ answers }, { questionNumber, exam: { questions } }) => (e, isChecked) => {
				const answerNumber = parseInt(e.target.name)
				
				const handleSelection = questions[questionNumber].multiple ? handleMultiSelection : handleRadioSelection
				
				return {
					answers: replaceArrayElement(answers, questionNumber, handleSelection(answers[questionNumber], answerNumber, !!isChecked)),
				}
			},
		},
)
