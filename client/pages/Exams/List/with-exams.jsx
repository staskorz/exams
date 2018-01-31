import { lifecycle } from 'recompose'

import * as rest from '../../../rest'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		rest.get('/api/exams')
				.then(exams => exams.map(({ tags, ...rest }) => ({ tags: tags || [], ...rest })))
				.then(exams => {
					this.setState({
						loading: false,
						exams,
					})
				})
	},
})
