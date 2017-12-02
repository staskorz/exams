import { withStateHandlers } from 'recompose'


export default withStateHandlers(
		{
			started: false,
		},
		
		{
			start: () => ({
				started: true,
			}),
		},
)
