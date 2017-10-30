export default (examsCollection, examId) => examsCollection.findOne({ _id: examId }, { name: 1 })
		.then(exam => exam && exam.name ? exam.name : null)
