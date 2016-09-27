import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import answersCollection from './collection';


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
			import fetchExam from '/imports/server/exam-solution-checking/fetch-exam';
			
			const exam = fetchExam(examId);
			
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
