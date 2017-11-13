export default rawValues => {
	const values = rawValues || {}
	
	const errors = {
		questions: [],
	}
	
	if(values.questions) {
		let totalWeight = 0
		let weightHasErrors = false
		
		values.questions.forEach((elem, index) => {
			//const weightError = simpleSchemaValidator(ExamsCollection, 'questions.$.weight', elem.weight)
			//
			//if(weightError) {
			//	errors.questions[index] = { weight: weightError }
			//	weightHasErrors = true
			//} else {
			//	totalWeight += elem.weight
			//}
			//
			//errors.questions[index] = Object.assign({}, errors.questions[index], {
			//	text: simpleSchemaValidator(ExamsCollection, 'questions.$.text', elem.text),
			//})
			//
			//if(elem.answers) {
			//	errors.questions[index].answers = []
			//	
			//	if(!elem.answers.some(elem2 => elem2 && elem2.correct)) {
			//		errors.questions[index].answers._error = 'At least one correct answer required'
			//	}
			//	
			//	elem.answers.forEach((elem2, index2) => {
			//		errors.questions[index].answers[index2] = {
			//			text: simpleSchemaValidator(ExamsCollection, 'questions.$.answers.$.text', elem2.text),
			//		}
			//	})
			//}
		})
		
		if(!weightHasErrors) {
			let weightError
			
			if(totalWeight > 100) {
				weightError = totalWeight + ' > 100'
			} else if(totalWeight < 100) {
				weightError = totalWeight + ' < 100'
			}
			
			if(weightError) {
				values.questions.forEach((elem, index) => {
					errors.questions[index] = Object.assign({}, errors.questions[index], { weight: weightError })
				})
			}
		}
	}
	
	//errors.name = simpleSchemaValidator(ExamsCollection, 'name', values.name)
	
	return errors
}
