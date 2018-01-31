import isYearValid from '../../../common/validations/fields/year'
import getPossibleDocumentCreationYears from '../utils/get-possible-document-creation-years'
import getYearSelector from '../utils/get-year-selector'
import onlyLast from '../utils/only-last'
import sortByKey from '../utils/sort-by-key'
import validateId from '../../../common/validations/fields/id'

export default (req, res) => {
	const { userId, year } = req.params
	
	if(!validateId(userId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examAnswersCollection = db.collection('Answers')
	const examAnswersSelector = { examineeUserId: userId }
	const examAnswersProjection = {
		fields: {
			examId: 1,
			examTimestamp: 1,
			mark: 1,
		},
		
		sort: {
			examId: 1,
			examTimestamp: 1,
		},
	}
	
	let numericYear
	
	if(year) {
		if(!isYearValid(year)) {
			res.status(400).send('Invalid year')
			
			throw new Error('Invalid year')
		}
		
		numericYear = parseInt(year, 10)
		
		examAnswersSelector.examTimestamp = getYearSelector(numericYear)
	}
	
	const currentYear = new Date().getFullYear()
	
	const possibleYears = getPossibleDocumentCreationYears(currentYear).filter(possibleYear => possibleYear !== numericYear)
	
	const yearQueryPromises = possibleYears.map(possibleYear => examAnswersCollection.findOne({
		examineeUserId: userId,
		examTimestamp: getYearSelector(possibleYear),
	}, { _id: 1 }).then(value => !!value))
	
	const yearsPromise = Promise.all([...yearQueryPromises])
			.then(([...yearsHavingExams]) => possibleYears.filter((_, index) => yearsHavingExams[index]))
			.then(years => numericYear ? [...years, numericYear].sort() : years)
	
	const examAnswersPromise = examAnswersCollection.find(examAnswersSelector, examAnswersProjection)
			.toArray()
			.then(answers => onlyLast(answers, 'examId'))
	
	const examsCollection = db.collection('Exams')
	const examsProjection = {
		fields: {
			name: 1,
		},
	}
	const examsPromise = examsCollection.find({}, examsProjection).toArray().then(exams => exams.reduce((acc, { _id, name }) => ({
		...acc,
		[_id]: name,
	}), {}))
	
	
	const usersCollection = db.collection('users')
	const usersProjection = {
		fields: {
			_id: 0,
			username: 1,
			englishName: 1,
			hebrewName: 1,
			employeeId: 1,
		},
	}
	const userPromise = usersCollection.findOne({ _id: userId }, usersProjection)
	
	const examResultsPromise = Promise.all([
		examAnswersPromise,
		examsPromise,
		userPromise,
	]).then(([examAnswers, exams, user]) => examAnswers.map(({ examId, ...rest }) => ({
		examId,
		examName: exams[examId],
		...user,
		...rest,
	}))).then(arr => sortByKey(arr, 'examName'))
	
	Promise.all([examResultsPromise, yearsPromise]).then(([results, years]) => {
		res.json({
			results,
			years,
		})
	}).catch(err => {
		const errorMessage = 'Error fetching exam answers from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ' + err.message)
	})
}
