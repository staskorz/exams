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
			totalWeight += parseInt(weight)
		}
		
		errors.questions[questionIndex] = Object.assign({}, errors.questions[questionIndex], {
			text: validateQuestionBody(formatMessage, text, setErrorsDetected),
		})
		
		errors.questions[questionIndex].answers = []
		
		const noCorrectAnswers = !answers.some(answer => answer.correct)
		
		if(noCorrectAnswers) {
			setErrorsDetected()
		}
		
		errors.questions[questionIndex].answers = answers.map(({ text }) => ({
			correct: noCorrectAnswers,
			text: validateAnswerBody(formatMessage, text, setErrorsDetected),
		}))
	})
	
	if(weightHasErrors) {
		setErrorsDetected()
	} else {
		let weightError
		
		if(totalWeight > 100) {
			weightError = totalWeight + ' > 100'
		} else if(totalWeight < 100) {
			weightError = totalWeight + ' < 100'
		}
		
		if(weightError) {
			setErrorsDetected()
			
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
