import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import withLoadingIndicator from '../../../hocs/with-loading-indicator'
import withAllResults from './with-all-results'
import Download from './Download'

const enhance = compose(
		withAllResults,
		withLoadingIndicator,
		injectIntl,
)

export default enhance(Download)
