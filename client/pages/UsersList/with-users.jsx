import { lifecycle } from 'recompose'

import * as rest from '../../rest/index'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		rest.get('/api/users').then(users => {
			this.setState({
				loading: false,
				users,
			})
		})
	},
})
