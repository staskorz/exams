export default ({ questions, ...rest }) => {
	const length = questions.length
	
	return {
		questions: questions.map(({ weight, ...rest }, index) => ({
			weight: index < length - 1 ? Math.floor(100 / length) : 100 - (Math.floor(100 / length) * (length - 1)),
			...rest,
		})),
		...rest,
	}
}
