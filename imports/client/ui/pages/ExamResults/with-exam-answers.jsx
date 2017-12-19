import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../../../../client/rest'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { examId } = this.props.router.params
				
				rest.get('/api/exam-answers/exam/' + examId).then(examResults => {
					this.setState({
						loading: false,
						examResults,
					})
				})
			},
		}),
)
