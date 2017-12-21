import { compose } from 'recompose'

import withNotificationStateHandlers from './with-notification-state-handlers'
import withNotifyMethod from './with-notify-method'


export default compose(
		withNotificationStateHandlers,
		withNotifyMethod,
)
