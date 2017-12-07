export default (questions, answers) => {
	if(questions.length !== answers.length) {
		return false
	}
	
	if(questions.some((elem, index) => elem.answers.length !== answers[index].length)) {
		return false
	}
	
	return true
}