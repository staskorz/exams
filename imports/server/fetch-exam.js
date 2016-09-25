import examsCollection from '/imports/api/exams/collection';


export default examId => examsCollection.findOne(examId, {
	fields: {
		published: 1,
		"questions.weight": 1,
		"questions.answers.correct": 1
	}
});
