import getAllUsersObject from '../utils/get-all-users-object'
import getExamName from '../utils/get-exam-name'
import onlyLast from '../utils/only-last'
import sortByKey from '../utils/sort-by-key'
import isYearValid from '../../../common/validations/fields/year'
import getPossibleDocumentCreationYears from '../utils/get-possible-document-creation-years'
import getYearSelector from '../utils/get-year-selector'
import isIdValid from '../../../common/validations/fields/id'


export default (req, res) => {
	const { examId, year } = req.params
	
	if(!isIdValid(examId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examAnswersCollection = db.collection('Answers')
	const examsCollection = db.collection('Exams')
	const usersCollection = db.collection('users')
	
	const selector = {
		examId,
	}
	
	let numericYear
	
	if(year) {
		if(!isYearValid(year)) {
			res.status(400).send('Invalid year')
			
			throw new Error('Invalid year')
		}
		
		numericYear = parseInt(year, 10)
		
		selector.examTimestamp = getYearSelector(numericYear)
	}
	
	const currentYear = new Date().getFullYear()
	
	const possibleYears = getPossibleDocumentCreationYears(currentYear).filter(possibleYear => possibleYear !== numericYear)
	
	const yearQueryPromises = possibleYears.map(possibleYear => examAnswersCollection.findOne({
		examId,
		examTimestamp: getYearSelector(possibleYear),
	}, { _id: 1 }).then(value => !!value))
	
	const yearsPromise = Promise.all([...yearQueryPromises])
			.then(([...yearsHavingExams]) => possibleYears.filter((_, index) => yearsHavingExams[index]))
			.then(years => numericYear ? [...years, numericYear].sort() : years)
	
	const projection = {
		fields: {
			examineeUserId: 1,
			examTimestamp: 1,
			mark: 1,
		},
		
		sort: {
			examineeUserId: 1,
			examTimestamp: 1,
		},
	}
	
	const getExistingUserDetails = ({ englishName, hebrewName, employeeId }) => ({
		englishName,
		hebrewName,
		employeeId,
	})
	
	const nonExistingUserDetails = {
		englishName: '?',
		hebrewName: '?',
		employeeId: '?',
	}
	
	const examAnswersPromise = examAnswersCollection.find(selector, projection).toArray()
			.then(value => onlyLast(value, 'examineeUserId'))
	const allUsersPromise = getAllUsersObject(usersCollection)
	const examNamePromise = getExamName(examsCollection, examId)
	
	const getUserDetails = (userId, allUsers) =>
			userId && allUsers[userId] ? getExistingUserDetails(allUsers[userId]) : nonExistingUserDetails
	
	const examResultsPromise = Promise.all([
		examAnswersPromise,
		allUsersPromise,
		examNamePromise,
	]).then(([lastExamAnswers, allUsers, examName]) => lastExamAnswers.map(({ examineeUserId, ...rest }) => ({
		userId: examineeUserId,
		username: allUsers[examineeUserId].username,
		...rest,
		...getUserDetails(examineeUserId, allUsers),
		examId,
		examName,
	}))).then(value => sortByKey(value, 'hebrewName'))
	
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
