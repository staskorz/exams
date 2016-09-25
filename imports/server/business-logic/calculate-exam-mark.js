export default (questions, examineeAnswers) => questions.reduce((acc, { weight, answers }, questionIndex) => {
	const isCorrect = answers.every(({ correct }, answerIndex) => !!correct === examineeAnswers[questionIndex].answers[answerIndex]);
	
	if(isCorrect) {
		return acc + weight;
	} else {
		return acc;
	}
}, 0);
