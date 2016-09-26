import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import answersCollection from './collection';
import { question as questionSchema } from './schema';

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
	run(record) {
		if(Meteor.isServer) {
			import calculateExamMark from '/imports/server/exam-solution-checking/calculate-exam-mark';
			import fetchExam from '/imports/server/exam-solution-checking/fetch-exam';
						
			const exam = fetchExam(record.examId);
			
			if(exam) {
				const mark = calculateExamMark(exam.questions, record.questions);
				
				const answersWithMark = {
					...record,
					mark
				};
				
				answersCollection.insert(answersWithMark);
				
				return mark;
			} else {
				throw new Meteor.Error('answers.insert.exam-not-found', 'Cannot find exam answered');
			}
		} else {
			return '?';
		}
	}
});
