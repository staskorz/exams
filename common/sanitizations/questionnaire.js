export default ({ name, questions, description, published }) => ({
	name,
	description,
	published,
	questions: questions.map(({ text, answers }) => ({
		text,
		answers: answers.map(({ freeText, text }) => ({
			freeText,
			text,
		})),
	})),
})
