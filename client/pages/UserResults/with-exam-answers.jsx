import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../rest/index'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { userId } = this.props.match.params
				
				rest.get('/api/exam-answers/user/' + userId).then(examResults => {
					this.setState({
						loading: false,
						examResults,
					})
				})
			},
		}),
)
