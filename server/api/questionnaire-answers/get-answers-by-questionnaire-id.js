import onlyLast from '../utils/only-last'
import getAllUsersObject from '../utils/get-all-users-object'
import getQuestionnaireName from '../utils/get-questionnaire-name'
import sortByKey from '../utils/sort-by-key'


export default (req, res) => {
	const { db } = req
	
	const questionnaireId = req.params['questionnaireId']
	
	const questionnaireAnswersCollection = db.collection('QuestionnaireAnswers')
	const questionnairesCollection = db.collection('Questionnaires')
	const usersCollection = db.collection('users')
	
	const projection = {
		fields: {
			userId: 1,
			timestamp: 1,
			questions: 1,
		},
		
		sort: {
			userId: 1,
			timestamp: 1,
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
	
	const getUserDetails = (userId, allUsers) =>
			userId && allUsers[userId] ? getExistingUserDetails(allUsers[userId]) : nonExistingUserDetails
	
	questionnaireAnswersCollection.find({ questionnaireId }, projection).toArray()
			.then(value => onlyLast(value, 'userId'))
			.then(value => Promise.all([
				value,
				getAllUsersObject(usersCollection),
				getQuestionnaireName(questionnairesCollection, questionnaireId),
			]))
			.then(([lastQuestionnaireAnswers, allUsers, questionnaireName]) =>
					lastQuestionnaireAnswers.map(({ userId, ...rest }) => ({
						userId: userId,
						username: allUsers[userId].username,
						...rest,
						...getUserDetails(userId, allUsers),
						questionnaireId,
						questionnaireName,
					})))
			.then(value => sortByKey(value, 'hebrewName'))
			.then(value => {
				res.json(value)
			}).catch(err => {
		const errorMessage = 'Error fetching questionnaire answers from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
}
