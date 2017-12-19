import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../rest'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { examId } = this.props.match.params
				
				rest.get('/api/exam-answers/exam/' + examId).then(examResults => {
					this.setState({
						loading: false,
						examResults,
					})
				})
			},
		}),
)
