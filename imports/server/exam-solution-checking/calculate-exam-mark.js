export default (questions, answersCorrectness) => questions.reduce((acc, { weight }, index) => {
	if(answersCorrectness[index]) {
		return acc + weight;
	} else {
		return acc;
	}
}, 0);
