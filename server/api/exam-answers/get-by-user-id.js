import onlyLast from '../utils/only-last'
import sortByKey from '../utils/sort-by-key'
import validateId from '../../../common/validations/fields/id'

export default (req, res) => {
	const userId = req.params['userId']
	
	if(!validateId(userId)) {
		res.status(500).send('Invalid id')
		
		throw new Error('Invalid id')
	}
	
	const { db } = req
	
	const examAnswersCollection = db.collection('Answers')
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
	const examAnswersPromise = examAnswersCollection.find({ examineeUserId: userId }, examAnswersProjection)
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
	
	Promise.all([examAnswersPromise, examsPromise, userPromise])
			.then(([examAnswers, exams, user]) => examAnswers.map(({ examId, ...rest }) => ({
				examId,
				examName: exams[examId],
				...user,
				...rest,
			}))).then(arr => sortByKey(arr, 'examName'))
			.then(arr => res.json(arr))
			.catch(err => {
				const errorMessage = 'Error fetching exam answers from DB.'
				
				res.status(500).send(errorMessage)
				
				throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
			})
}
