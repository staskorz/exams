import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../../../../client/rest'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const { examId } = this.props.router.params
				
				rest.get('/api/exams/examinee-version/' + examId).then(exam => {
					this.setState({
						loading: false,
						exam,
					})
				}).catch(() => {
					this.setState({
						loading: false,
						loadingError: true,
					})
				})
			},
		}),
)
