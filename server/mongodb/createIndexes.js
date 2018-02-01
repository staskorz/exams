const EXAM_ANSWERS_COLLECTION = 'Answers'


export default db => db.createIndex(EXAM_ANSWERS_COLLECTION, {
	examId: 1,
	examTimestamp: 1,
}).then(db.createIndex(EXAM_ANSWERS_COLLECTION, {
	examineeUserId: 1,
	examTimestamp: 1,
})).then(() => db)
