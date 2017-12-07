import isAnswerCorrect from './is-answer-correct'


export default (questions, examineeAnswers) =>
		questions.map(({ answers }, questionIndex) =>
				isAnswerCorrect(answers, examineeAnswers[questionIndex]))
