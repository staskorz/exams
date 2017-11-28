export default ({ name, questions, description, published }) => ({
	name,
	description,
	published,
	questions: questions.map(({ text, multipleChoice, answers }) => ({
		text,
		multipleChoice,
		answers: answers.map(({ freeText, text }) => ({
			freeText,
			text,
		})),
	})),
})
