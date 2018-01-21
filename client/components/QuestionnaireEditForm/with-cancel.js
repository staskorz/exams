import { withHandlers } from 'recompose'


export default withHandlers({
	onCancel: ({ history }) => () => {
		history.push('/questionnaires/list')
	},
})
