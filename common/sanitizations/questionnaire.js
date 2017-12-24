export default ({ name, questions, description, published }) => ({
	name,
	description,
	published: !!published,
	questions: questions.map(({ text, multipleChoice, answers }) => ({
		text,
		multipleChoice: !!multipleChoice,
		answers: answers.map(({ freeText, text }) => ({
			freeText: !!freeText,
			text,
		})),
	})),
})
