import { withStateHandlers } from 'recompose'


export default withStateHandlers(
		({ exams }) => ({ exams }),
		{
			updateExamsInState: ({ exams }) => (examId, updatedPublishedValue) => ({
				exams: exams.map(({ _id, published, ...rest }) => ({
					_id,
					published: examId === _id ? updatedPublishedValue : published,
					...rest,
				})),
			}),
		},
)
