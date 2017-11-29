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

export default (value, formatMessage) => {
	let errorsDetected = false
	
	const setErrorsDetected = () => {
		errorsDetected = true
	}
	
	const errors = {
		questions: [],
	}
	
	let totalWeight = 0
	let weightHasErrors = false
	
	value.questions.forEach(({ weight, text, answers }, questionIndex) => {
		const weightError = validateWeight(formatMessage, weight, setErrorsDetected)
		
		if(weightError) {
			errors.questions[questionIndex] = { weight: weightError }
			weightHasErrors = true
		} else {
			totalWeight += weight
		}
		
		errors.questions[questionIndex] = Object.assign({}, errors.questions[questionIndex], {
			text: validateQuestionBody(formatMessage, text, setErrorsDetected),
		})
		
		errors.questions[questionIndex].answers = []
		
		if(!answers.some(answer => answer && answer.correct)) {
			errors.questions[questionIndex].answers._error = 'At least one correct answer required'
		}
		
		answers.forEach(({ text }, answerIndex) => {
			errors.questions[questionIndex].answers[answerIndex] = {
				text: validateAnswerBody(formatMessage, text, setErrorsDetected),
			}
		})
	})
	
	if(!weightHasErrors) {
		let weightError
		
		if(totalWeight > 100) {
			weightError = totalWeight + ' > 100'
		} else if(totalWeight < 100) {
			weightError = totalWeight + ' < 100'
		}
		
		if(weightError) {
			value.questions.forEach((elem, index) => {
				errors.questions[index] = Object.assign({}, errors.questions[index], { weight: weightError })
			})
		}
	}
	
	errors.name = validateTitle(formatMessage, value.name, setErrorsDetected)
	
	return {
		errors,
		errorsDetected,
	}
}
