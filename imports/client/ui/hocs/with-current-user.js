import { compose, withProps, lifecycle } from 'recompose'

import * as rest from '../../rest'

import withLoadingIndicator from './with-loading-indicator'


let currentUser


export default compose(
		withProps({
			loading: true,
		}),
		
		lifecycle({
			componentDidMount() {
				const update = () => {
					this.setState({
						loading: false,
						currentUser,
					})
				}
				
				if(currentUser) {
					update()
				} else {
					rest.get('/api/me').then(me => {
						currentUser = me
						
						update()
					}).catch(() => {
						this.setState({
							loading: false,
						})
					})
				}
			},
		}),
		
		withLoadingIndicator,
)
