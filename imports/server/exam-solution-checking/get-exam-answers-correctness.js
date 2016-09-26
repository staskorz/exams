import isAnswerCorrect from './is-answer-correct';


export default (questions, examineeAnswers) =>
		questions.map(({ weight, answers }, questionIndex) =>
				isAnswerCorrect(answers, examineeAnswers[questionIndex].answers));
