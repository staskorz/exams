const projection = {
	fields: {
		name: 1,
	},
}


export default (examsCollection, examId) => examsCollection.findOne({ _id: examId }, projection)
		.then(exam => exam && exam.name ? exam.name : null)
