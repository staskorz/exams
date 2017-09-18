import { withHandlers } from 'recompose'


export default withHandlers({
	onCancel: ({ router }) => () => {
		router.push('/list-questionnaires')
	},
})
