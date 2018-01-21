import { lifecycle } from 'recompose'

import * as rest from '../../../rest/index'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		const { answersId } = this.props.match.params
		
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
