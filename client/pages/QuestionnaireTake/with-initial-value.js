import { withProps } from 'recompose'


export default withProps(({ questionnaire: { questions } }) => ({
	initialValue: questions.map(({ answers }) => ({
		answers: answers.map(({ freeText }) => ({
			checked: false,
			freeText: freeText ? '' : undefined,
		})),
	})),
}))
