import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import collection from './collection';


export const insert = new ValidatedMethod({
	name: 'exams.insert',
	validate: collection.simpleSchema().validator(),
	run(record) {
		return collection.insert(record);
	}
});


export const update = new ValidatedMethod({
	name: 'exams.update',
	validate: collection.simpleSchema().validator(),
	run(record) {
		const { _id, ...rest } = record;
		
		return collection.update({ _id: _id }, { $set: rest });
	}
});


const examsFindOneSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	}
});

export const findOne = new ValidatedMethod({
	name: 'exams.findOne',
	validate: examsFindOneSchema.validator(),
	run({ examId }) {
		return collection.findOne(examId);
	}
});


const examsGetExamineeVersionSchema = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	}
});

const hasMultipleCorrectAnswers = answers => answers.reduce((acc, { correct }) => correct ? acc + 1 : acc, 0) > 1;

export const getExamineeVersion = new ValidatedMethod({
	name: 'exams.getExamineeVersion',
	validate: examsGetExamineeVersionSchema.validator(),
	run({ examId }) {
		const rawExam = collection.findOne(examId, {
			fields: {
				name: 1,
				number: 1,
				'questions.text': 1,
				'questions.answers': 1
			}
		});
		
		if(rawExam && rawExam.questions) {
			const { questions, ...exam } = rawExam;
			
			exam.questions = questions.map(({ text, answers }) => ({
				text,
				answers: answers.map(({ text }) => (text)),
				multiple: hasMultipleCorrectAnswers(answers)
			}));
			
			return exam;
		} else {
			return null;
		}
	}
});


const examsGetQuestion = new SimpleSchema({
	examId: {
		type: SimpleSchema.RegEx.Id
	},
	
	questionNumber: {
		type: Number
	}
});

export const getQuestion = new ValidatedMethod({
	name: 'exams.getQuestion',
	validate: examsGetQuestion.validator(),
	run({ examId, questionNumber }) {
		let questionsProjection;
		
		if(Meteor.isServer) {
			questionsProjection = {
				questions: {
					$slice: [questionNumber, 1]
				}
			};
		} else {
			questionsProjection = {};
		}
		
		const rawResult = collection.findOne(examId, {
			fields: {
				_id: 0,
				'questions.text': 1,
				'questions.answers.text': 1,
				'questions.answers.correct': 1,
				...questionsProjection
			}
		});
		
		if(rawResult && rawResult.questions) {
			const rawQuestion = rawResult.questions[0];
			
			const { answers, ...question } = rawQuestion;
			
			question.answers = answers.map(({ text }) => (text));
			
			const numCorrectAnswers = answers.reduce(
					(acc, { correct }) => correct ? acc + 1 : acc,
					0
			);
			
			question.multiple = numCorrectAnswers > 1;
			
			return question;
		} else {
			return null;
		}
	}
});
