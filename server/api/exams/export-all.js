import dateJsToCsv from '../../../common/util/date-js-to-csv'


const arrayToIdKeyedObject = arr => arr.reduce((acc, {_id, ...rest}) => ({
	...acc,
	[_id]: rest,
}),{})

const getExamFields = ({name: examName, createdAt, updatedAt, tags}) => ({
	examName,
	examCreatedAt: dateJsToCsv(createdAt),
	examUpdatedAt: dateJsToCsv(updatedAt),
	examTags: tags ? tags.join(',') : '',
})

const getUserFields = ({
	username,
	role: userRole,
	englishName: englishUserName,
	hebrewName: hebrewUserName,
	employeeId,
}) => ({
	username,
	userRole,
	englishUserName,
	hebrewUserName,
	employeeId,
})

export default (req, res) => {
	const { db } = req
	
	const examsCollection = db.collection('Exams')
	const examAnswersCollection = db.collection('Answers')
	const usersCollection = db.collection('users')
	
	const examsProjection = {
		fields: {
			name: 1,
			createdAt: 1,
			updatedAt: 1,
			tags: 1,
		},
	}
	
	const examAnswersProjection = {
		fields: {
			examId: 1,
			examTimestamp: 1,
			examineeUserId: 1,
			mark: 1,
		},
	}
	
	const usersProjection = {
		fields: {
			username: 1,
			role: 1,
			englishName: 1,
			hebrewName: 1,
			employeeId: 1,
		},
	}
	
	const examAnswersPromise = examAnswersCollection.find({}, examAnswersProjection).toArray()
	const examsPromise = examsCollection.find({}, examsProjection).toArray().then(arrayToIdKeyedObject)
	const usersPromise = usersCollection.find({}, usersProjection).toArray().then(arrayToIdKeyedObject)
	
	Promise.all([examAnswersPromise, examsPromise, usersPromise]).then(([examAnswers, exams, users]) => {
		res.json(examAnswers.map(({ _id: examAnswerId, examId, examTimestamp, examineeUserId, mark }) => ({
			examAnswerId,
			examId,
			examTimestamp: dateJsToCsv(examTimestamp),
			examineeUserId,
			mark,
			...getExamFields(exams[examId]),
			...getUserFields(users[examineeUserId]),
		})))
	}).catch(err => {
		const errorMessage = 'Error fetching from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ' + err.message)
	})
}
