export default (questions, examineeAnswers) => questions.reduce((acc, { weight, answers }, questionIndex) => {
	const isCorrect = answers.every(({ correct }, answerIndex) => !!correct === examineeAnswers[questionIndex].answers[answerIndex]);
	
	if(isCorrect) {
		acc += weight;
	}
}, 0);
