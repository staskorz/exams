export default (examQuestions, answeredQuestions) => examQuestions.map(({ answers, text, images, weight }, questionIndex) => ({
	correct: !!answeredQuestions[questionIndex].correct,
	text,
	images,
	weight,
	
	variants: answers.map(({ text, correct: correctChecked }, variantIndex) => ({
		text,
		correctChecked,
		userChecked: !!answeredQuestions[questionIndex].answers[variantIndex],
	})),
}))
