import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import answersCollection from './collection';
import getUserRole from '/imports/api/utils/get-user-role';
import getAllUsersObject from '/imports/api/utils/get-all-users-object';


const questionSchema = new SimpleSchema({
	answers: {
		type: [Boolean],
		minCount: 2,
		maxCount: 4
	}
});


const answersInsertSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	},
	
	questions: {
		type: [questionSchema],
		minCount: 1
	}
});


export const insert = new ValidatedMethod({
	name: 'answers.insert',
	validate: answersInsertSchema.validator(),
	run({ examId, questions }) {
		if(!this.userId) {
			throw new Meteor.Error('answers.insert.notLoggedIn', 'Must be logged in.');
		}
		
		if(Meteor.isServer) {
			import calculateExamMark from '/imports/server/exam-solution-checking/calculate-exam-mark';
			import getExamAnswersCorrectness from '/imports/server/exam-solution-checking/get-exam-answers-correctness';
			import fetchPublishedExam from '/imports/server/exam-solution-checking/fetch-published-exam';
			
			const exam = fetchPublishedExam(examId);
			
			if(exam) {
				const examAnswersCorrectness = getExamAnswersCorrectness(exam.questions, questions);
				
				const mark = calculateExamMark(exam.questions, examAnswersCorrectness);
				
				const questionsWithCorrectness = questions.map((question, index) => ({ ...question, correct: examAnswersCorrectness[index] }));
				
				const answersWithMarkAndCorrectness = {
					examId,
					questions: questionsWithCorrectness,
					mark
				};
				
				answersCollection.insert(answersWithMarkAndCorrectness);
				
				return mark;
			} else {
				throw new Meteor.Error('answers.insert.exam-not-found', 'Cannot find exam answered');
			}
		} else {
			return '?';
		}
	}
});


const getExamResultsSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	}
});


export const getExamResults = new ValidatedMethod({
	name: 'answers.getExamResults',
	validate: getExamResultsSchema.validator(),
	run({ examId }) {
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('answers.getExamResults.notOperator', 'Available only for operators.');
		}
		
		const allExamResults = answersCollection.find({ examId }, {
			fields: {
				examineeUserId: 1,
				examTimestamp: 1,
				mark: 1
			},
			
			sort: {
				examineeUserId: 1,
				examTimestamp: 1
			}
		}).fetch();
		
		if(!allExamResults) {
			return [];
		}
		
		const allExamResultsLength = allExamResults.length;
		
		const examResults = [];
		
		for(let i = 0; i < allExamResultsLength; i++) {
			if(!allExamResults[i + 1] || allExamResults[i].examineeUserId !== allExamResults[i + 1].examineeUserId) {
				examResults.push(allExamResults[i]);
			}
		}
		
		const allUsers = getAllUsersObject();
		
		const transformedExamResults = examResults.map(({ examineeUserId, ...rest }) => ({
			username: examineeUserId && allUsers[examineeUserId] ? allUsers[examineeUserId] : '?',
			...rest
		}));
		
		const transformedExamResultsSorted = transformedExamResults.sort(({ username: a }, { username: b }) => {
			if (a < b) {
				return -1;
			} else if (a > b) {
				return 1;
			} else {
				return 0;
			}
		});
		
		return transformedExamResultsSorted;
	}
});
