import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../../rest/index'


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			load() {
				const { year, match: { params: { userId } } } = this.props
				
				let path = '/api/exam-answers/user/' + userId
				
				if(year) {
					path += '/year/' + year
				}
				
				rest.get(path).then(({ results, years }) => {
					this.setState({
						loading: false,
						examResults: results,
						availableTags: years,
					})
				})
			},
			
			componentDidMount() {
				this.load()
			},
			
			componentDidUpdate(prevProps) {
				if(prevProps.year !== this.props.year) {
					this.setState({
						loading: true,
					})
					
					this.load()
				}
			},
		}),
)
