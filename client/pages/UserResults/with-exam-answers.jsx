import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../rest/index'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { userId } = this.props.router.params
				
				rest.get('/api/exam-answers/user/' + userId).then(examResults => {
					this.setState({
						loading: false,
						examResults,
					})
				})
			},
		}),
)
