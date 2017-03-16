import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import answersCollection from './collection';
import getUserRole from '/imports/api/utils/get-user-role';
import getExam from '/imports/api/utils/get-exam';
import getExamName from '/imports/api/utils/get-exam-name';
import getAllUsersObject from '/imports/api/utils/get-all-users-object';
import getAllExamsObject from '/imports/api/utils/get-all-exams-object';
import getUser from '/imports/api/utils/get-user';


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
				
				const questionsWithCorrectness = questions.map((question, index) => ({
					...question,
					correct: examAnswersCorrectness[index]
				}));
				
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
		if(Meteor.isClient) {
			return [];
		}
		
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
		
		const examName = getExamName(examId);
		
		const transformedExamResults = examResults.map(({ examineeUserId, ...rest }) => {
			let additionalProps = {};
			
			if(examineeUserId && allUsers[examineeUserId]) {
				const { englishName, hebrewName, employeeId } = allUsers[examineeUserId];
				
				additionalProps = {
					englishName,
					hebrewName,
					employeeId
				};
			} else {
				additionalProps = {
					englishName: '?',
					hebrewName: '?',
					employeeId: '?'
				};
			}
			
			return {
				userId: examineeUserId,
				username: allUsers[examineeUserId].username,
				...rest,
				...additionalProps,
				examId,
				examName
			};
		});
		
		const transformedExamResultsSorted = transformedExamResults.sort(({ hebrewName: a }, { hebrewName: b }) => {
			if(a < b) {
				return -1;
			} else if(a > b) {
				return 1;
			} else {
				return 0;
			}
		});
		
		return transformedExamResultsSorted;
	}
});


const getExamResultsForUserSchema = new SimpleSchema({
	userId: {
		type: SimpleSchema.RegEx.Id
	}
});


export const getExamResultsForUser = new ValidatedMethod({
	name: 'answers.getExamResultsForUser',
	validate: getExamResultsForUserSchema.validator(),
	run({ userId }) {
		if(Meteor.isClient) {
			return [];
		}
		
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('answers.getExamResultsForUser.notOperator', 'Available only for operators.');
		}
		
		const allExamResults = answersCollection.find({ examineeUserId: userId }, {
			fields: {
				examId: 1,
				examTimestamp: 1,
				mark: 1
			},
			
			sort: {
				examId: 1,
				examTimestamp: 1
			}
		}).fetch();
		
		if(!allExamResults) {
			return [];
		}
		
		const allExams = getAllExamsObject();
		
		const allExamResultsLength = allExamResults.length;
		
		const examResults = [];
		
		for(let i = 0; i < allExamResultsLength; i++) {
			if(!allExamResults[i + 1] || allExamResults[i].examId !== allExamResults[i + 1].examId) {
				examResults.push(allExamResults[i]);
			}
		}
		
		const user = getUser(userId);
		
		const { englishName, hebrewName, employeeId, username } = user;
		
		let additionalProps = {};
		
		if(user) {
			additionalProps = {
				username,
				userId,
				englishName,
				hebrewName,
				employeeId
			};
		} else {
			additionalProps = {
				username: '?',
				userId: '?',
				englishName: '?',
				hebrewName: '?',
				employeeId: '?'
			};
		}
		
		const transformedExamResults = examResults.map(({ examId, ...rest }) => ({
			...additionalProps,
			examId,
			examName: allExams[examId],
			...rest
		}));
		
		const transformedExamResultsSorted = transformedExamResults.sort(({ examName: a }, { examName: b }) => {
			if(a < b) {
				return -1;
			} else if(a > b) {
				return 1;
			} else {
				return 0;
			}
		});
		
		return transformedExamResultsSorted;
	}
});


const getExamWithAnswersSchema = new SimpleSchema({
	answersId: {
		type: SimpleSchema.RegEx.Id
	}
});


export const getExamWithAnswers = new ValidatedMethod({
	name: 'answers.getExamWithAnswers',
	validate: getExamWithAnswersSchema.validator(),
	run({ answersId }) {
		if(Meteor.isClient) {
			return {};
		}
		
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('answers.getExamWithAnswers.notOperator', 'Available only for operators.');
		}
		
		const answers = answersCollection.findOne({ _id: answersId }, {
			fields: {
				mark: 1,
				examTimestamp: 1,
				examineeUserId: 1,
				questions: 1,
				examId: 1,
			}
		});
		
		if(!answers) {
			return {};
		}
		
		const exam = getExam(answers.examId);
		
		const user = getUser(answers.examineeUserId);
		
		return {
			answers,
			exam,
			user,
		};
	}
});

