import { lifecycle } from 'recompose'

import * as rest from '../../../rest'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		rest.get('/api/exams/export')
				.then(allResults => {
					this.setState({
						loading: false,
						allResults,
					})
				})
	},
})
