import { compose, withProps } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

import withState from '../../../components/ExamEditForm/with-state'

import withCreate from './with-create'


export default compose(
		withRouter,
		injectIntl,
		
		withProps({
			exam: {
				name: '',
				questions: [
					{
						text: '',
						weight: 10,
						images: [null, null, null, null],
						
						answers: [
							{ text: '' },
							{ text: '' },
						],
					},
				],
			},
			
			initialAutoWeight: true,
		}),
		
		withState,
		withCreate,
)
