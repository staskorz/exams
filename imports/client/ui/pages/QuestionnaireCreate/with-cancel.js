import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router'


export default compose(
		withRouter,
		
		withHandlers({
			onCancel: ({ router }) => () => {
				router.push('/list-questionnaires')
			},
		}),
)
