import isAnswerCorrect from './is-answer-correct';


export default (questions, examineeAnswers) => questions.reduce((acc, { weight, answers }, questionIndex) => {
	const isCorrect = isAnswerCorrect(answers, examineeAnswers[questionIndex].answers);
	
	if(isCorrect) {
		return acc + weight;
	} else {
		return acc;
	}
}, 0);
