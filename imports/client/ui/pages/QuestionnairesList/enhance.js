import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import withQuestionnaires from './with-questionnaires'


export default compose(
		injectIntl,
		withQuestionnaires,
)
