import examsCollection from '../exams/collection';


export default examId => {
	const exam = examsCollection.findOne({ _id: examId }, {
		name: 1,
		published: 1,
		createdAt: 1,
		updatedAt: 1,
		questions: 1,
	});
	
	return exam;
}
