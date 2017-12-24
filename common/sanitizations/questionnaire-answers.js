export default ({ questionnaireId, questions }) => ({
	questionnaireId,
	questions: questions.map(({ answers }) => ({
		answers: answers.map(({ checked, freeText }) => ({
			checked: !!checked,
			freeText,
		})),
	})),
})
