import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../../rest/index'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { examId } = this.props.match.params
				
				rest.get('/api/exams/' + examId).then(exam => {
					this.setState({
						loading: false,
						exam,
					})
				})
			},
		}),
)
