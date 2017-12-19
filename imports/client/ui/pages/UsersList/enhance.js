import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../../../client/hocs/with-loading-indicator'

import withUsers from './with-users'
import withFilter from './with-filter'


export default compose(
		withUsers,
		withLoadingIndicator,
		injectIntl,
		withFilter,
)
