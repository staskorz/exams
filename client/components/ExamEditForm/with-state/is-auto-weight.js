import calculateAutoWeight from '../calculate-auto-weight'


export default ({ questions }) => {
	const { questions: questionsWithAutoWeight } = calculateAutoWeight({ questions })
	
	return questionsWithAutoWeight.every(({ weight }, index) => weight === questions[index].weight)
}
