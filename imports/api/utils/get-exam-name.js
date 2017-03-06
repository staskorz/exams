import examsCollection from '../exams/collection';


export default examId => {
	const exam = examsCollection.findOne({ _id: examId }, { name: 1 });
	
	if(exam && exam.name) {
		return exam.name;
	} else {
		return null;
	}
}
