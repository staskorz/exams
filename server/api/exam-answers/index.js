import { Router } from 'express'

import onlyLast from '../utils/only-last'
import getAllUsersObject from '../utils/get-all-users-object'
import getExamName from '../utils/get-exam-name'
import sortByKey from '../utils/sort-by-key'


const router = Router()


router.get('/:examId', (req, res) => {
	const { db } = req
	
	const examId = req.params['examId']
	
	const examAnswersCollection = db.collection('Answers')
	const examsCollection = db.collection('Exams')
	const usersCollection = db.collection('users')
	
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
	
	const getUserDetails = (userId, allUsers) =>
			userId && allUsers[userId] ? getExistingUserDetails(allUsers[userId]) : nonExistingUserDetails
	
	examAnswersCollection.find({ examId }, projection).toArray()
			.then(value => onlyLast(value, 'examineeUserId'))
			.then(value => Promise.all([
				value,
				getAllUsersObject(usersCollection),
				getExamName(examsCollection, examId),
			]))
			.then(([lastExamAnswers, allUsers, examName]) => lastExamAnswers.map(({ examineeUserId, ...rest }) => ({
				userId: examineeUserId,
				username: allUsers[examineeUserId].username,
				...rest,
				...getUserDetails(examineeUserId, allUsers),
				examId,
				examName,
			})))
			.then(value => sortByKey(value, 'hebrewName'))
			.then(value => {
				res.json(value)
			}).catch(err => {
		const errorMessage = 'Error fetching exam answers from DB.'
		
		res.status(500).send(errorMessage)
		
		throw new Error(errorMessage + ' ' + err.name + ': ', err.message)
	})
})


export default router
