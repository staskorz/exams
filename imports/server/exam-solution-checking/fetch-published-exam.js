import examsCollection from '/imports/api/exams/collection';


export default examId => examsCollection.findOne({ _id: examId, published: true }, {
	fields: {
		published: 1,
		"questions.weight": 1,
		"questions.answers.correct": 1
	}
});
