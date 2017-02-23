import examsCollection from '../exams/collection';


export default () => {
	const exams = examsCollection.find({}, { _id: 1, name: 1 });
	
	const examsObj = {};
	
	if(exams) {
		exams.forEach(({ _id, name}) => {
			examsObj[_id] = name;
		});
	}
	
	return examsObj;
}
