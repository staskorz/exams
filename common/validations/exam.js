import validateNumber from './fields/number'


const minWeight = 1
const maxWeight = 100
const maxTitleChars = 50
const maxQuestionBodyChars = 500
const maxAnswerBodyChars = 500


const validateTextCreator = (maxChars, required = true) => (formatMessage, value, setErrorsDetected) => {
	if(required && (!value || !value.trim())) {
		setErrorsDetected()
		
		return formatMessage({ id: 'required' })
	} else if(value && value.length > maxChars) {
		setErrorsDetected()
		
		return formatMessage({ id: 'maxChars' }, { number: maxChars })
	}
}


const validateNumberIsInRange = (min, max) => (formatMessage, value, setErrorsDetected) => {
	if(value === undefined || value === null || value === '') {
		setErrorsDetected()
		
		return formatMessage({ id: 'required' })
	} else if(!validateNumber(value)) {
		setErrorsDetected()
		
		return formatMessage({ id: 'onlyNumbers' })
	} else if(value < min) {
		setErrorsDetected()
		
		return formatMessage({ id: 'minNumber' }, { min })
	} else if(value > max) {
		setErrorsDetected()
		
		return formatMessage({ id: 'maxNumber' }, { max })
	}
}


const validateTitle = validateTextCreator(maxTitleChars)
const validateQuestionBody = validateTextCreator(maxQuestionBodyChars)
const validateAnswerBody = validateTextCreator(maxAnswerBodyChars)
const validateWeight = validateNumberIsInRange(minWeight, maxWeight)

export default values => {
	let errorsDetected = false
	
	const setErrorsDetected = () => {
		errorsDetected = true
	}
	
	const errors = {
		questions: [],
	}
	
	let totalWeight = 0
	let weightHasErrors = false
	
	values.questions.forEach((elem, index) => {
		const weightError = validateWeight()
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
	
	//errors.name = simpleSchemaValidator(ExamsCollection, 'name', values.name)
	
	return errors
}
