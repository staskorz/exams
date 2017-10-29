import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../hocs/with-loading-indicator'

import withQuestionnaires from './with-questionnaires'


export default compose(
		withQuestionnaires,
		withLoadingIndicator,
		injectIntl,
)
