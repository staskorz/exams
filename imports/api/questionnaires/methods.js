import { ValidatedMethod } from 'meteor/mdg:validated-method';

import collection from './collection';
import getUserRole from '/imports/api/utils/get-user-role';


export const insert = new ValidatedMethod({
	name: 'exams.insert',
	validate: collection.simpleSchema().validator(),
	run(record) {
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('exams.insert.notOperator', 'Available only for operators.');
		}
		
		return collection.insert(record);
	}
});


export const update = new ValidatedMethod({
	name: 'exams.update',
	validate: collection.simpleSchema().validator(),
	run(record) {
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('exams.update.notOperator', 'Available only for operators.');
		}
		
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
		if(getUserRole(this.userId) !== 'operator') {
			throw new Meteor.Error('exams.findOne.notOperator', 'Available only for operators.');
		}
		
		return collection.findOne(examId, {
			fields: {
				_id: 1,
				name: 1,
				published: 1,
				questions: 1
			}
		});
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
		if(!this.userId) {
			throw new Meteor.Error('exams.getExamineeVersion.notLoggedIn', 'Must be logged in.');
		}
		
		const rawExam = collection.findOne({ _id: examId, published: true }, {
			fields: {
				name: 1,
				'questions.text': 1,
				'questions.answers': 1,
				'questions.images': 1
			}
		});
		
		if(rawExam && rawExam.questions) {
			const { questions, ...exam } = rawExam;
			
			exam.questions = questions.map(({ text, answers, images }) => ({
				text,
				answers: answers.map(({ text }) => (text)),
				images,
				multiple: hasMultipleCorrectAnswers(answers)
			}));
			
			return exam;
		} else {
			return null;
		}
	}
});
