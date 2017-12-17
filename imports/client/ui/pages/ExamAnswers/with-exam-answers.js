import { lifecycle } from 'recompose'

import * as rest from '../../../rest'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		const { answersId } = this.props.router.params
		
		rest.get('/api/exam-answers/' + answersId).then(({ exam, answers, user }) => {
			this.setState({
				loading: false,
				exam,
				answers,
				user,
			})
		})
	},
})
