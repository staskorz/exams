import { lifecycle } from 'recompose'

import * as rest from '../../rest/index'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		rest.get('/api/questionnaires').then(questionnaires => {
			this.setState({
				loading: false,
				questionnaires,
			})
		})
	},
})
