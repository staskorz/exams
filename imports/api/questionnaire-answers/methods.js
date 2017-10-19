import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import getUserRole from '/imports/api/utils/get-user-role'
import getAllUsersObject from '/imports/api/utils/get-all-users-object'
import getQuestionnaireName from '/imports/api/utils/get-questionnaire-name'

import collection from './collection'
import schema from './schema'


export const insert = new ValidatedMethod({
	name: 'questionnaireAnswers.insert',
	validate: schema.validator(),
	run(answeredQuestionnaire) {
		if(!this.userId) {
			throw new Meteor.Error('questionnaireAnswers.insert.notLoggedIn', 'Must be logged in.')
		}
		
		collection.insert(answeredQuestionnaire)
	},
})


const getQuestionnaireResultsSchema = new SimpleSchema({
	questionnaireId: {
		type: SimpleSchema.RegEx.Id,
	},
})


export const getQuestionnaireResults = new ValidatedMethod({
	name: 'questionnaireAnswers.getQuestionnaireResults',
	validate: getQuestionnaireResultsSchema.validator(),
	run({ questionnaireId }) {
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('questionnaireAnswers.getQuestionnaireResults.notOperator', 'Available only for operators.')
		}
		
		const allQuestionnaireResults = collection.find({ questionnaireId }, {
			fields: {
				userId: 1,
				timestamp: 1,
				questions: 1,
			},
			
			sort: {
				userId: 1,
				timestamp: 1,
			},
		}).fetch()
		
		if(!allQuestionnaireResults) {
			return []
		}
		
		const allQuestionnaireResultsLength = allQuestionnaireResults.length
		
		const questionnaireResults = []
		
		for(let i = 0; i < allQuestionnaireResultsLength; i++) {
			if(!allQuestionnaireResults[i + 1] ||
					allQuestionnaireResults[i].userId !== allQuestionnaireResults[i + 1].userId) {
				questionnaireResults.push(allQuestionnaireResults[i])
			}
		}
		
		const allUsers = getAllUsersObject()
		
		const questionnaireName = getQuestionnaireName(questionnaireId)
		
		const transformedQuestionnaireResults = questionnaireResults.map(({ examineeUserId, ...rest }) => {
			let additionalProps = {}
			
			if(examineeUserId && allUsers[examineeUserId]) {
				const { englishName, hebrewName, employeeId } = allUsers[examineeUserId]
				
				additionalProps = {
					englishName,
					hebrewName,
					employeeId,
				}
			} else {
				additionalProps = {
					englishName: '?',
					hebrewName: '?',
					employeeId: '?',
				}
			}
			
			return {
				userId: examineeUserId,
				username: allUsers[examineeUserId].username,
				...rest,
				...additionalProps,
				questionnaireId,
				questionnaireName,
			}
		})
		
		const transformedQuestionnaireResultsSorted = transformedQuestionnaireResults.sort(({ hebrewName: a }, { hebrewName: b }) => {
			if(a < b) {
				return -1
			} else if(a > b) {
				return 1
			} else {
				return 0
			}
		})
		
		return transformedQuestionnaireResultsSorted
	},
})
