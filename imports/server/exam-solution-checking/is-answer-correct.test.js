import isAnswerCorrect from './is-answer-correct'


//export default (correctAnswer, examineeAnswer) => correctAnswer.every(({ correct }, index) => !!correct === !!examineeAnswer[index]);
describe('tell correct answer from an incorrect one', () => {
	const correctAnswer = [
		{
			correct: true
		},
		
		{
			correct: false
		}
	];
	
	const examineeAnswerCorrect = [
		true,
		false
	];
	
	const examineeAnswerIncorrect = [
		true,
		true
	];
	
	it('tells correct answer', () => {
		expect(isAnswerCorrect(correctAnswer, examineeAnswerCorrect)).toBeTruthy();
	});
	
	it('tells incorrect answer', () => {
		expect(isAnswerCorrect(correctAnswer, examineeAnswerIncorrect)).toBeFalsy();
	});
});
