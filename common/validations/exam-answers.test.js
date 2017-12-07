import validate from './exam-answers'


const questions = [
	{
		answers: [
			1, 2,
		],
	},
	
	{
		answers: [
			1, 2, 3, 4,
		],
	},
	
	{
		answers: [
			1, 2, 3,
		],
	},
]


const invalidAnswersShort = [
	[true, false],
	[true, false, false],
]


const invalidAnswersOneShort = [
	[true, false],
	[true, false, false, false],
	[true, false],
]


const validAnswers = [
	[true, false],
	[true, false, false, false],
	[true, false, false],
]


describe('validates exam answers', () => {
	it('detects as invalid if number of questions asked does not match the number of questions answered', () => {
		expect(validate(questions, invalidAnswersShort)).toBeFalsy()
	})
	
	it('detects as invalid if number of answers to each question does not match the number of possible answers to each corresponding question', () => {
		expect(validate(questions, invalidAnswersOneShort)).toBeFalsy()
	})
	
	it('detects as valid if number asked and answered questions match and each answered question has the same number of answers as the corresponding question', () => {
		expect(validate(questions, validAnswers)).toBeTruthy()
	})
})
