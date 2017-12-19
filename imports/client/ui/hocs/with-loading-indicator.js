import { branch, renderComponent } from 'recompose'

import LoadingIndicator from '../../../../client/components/LoadingIndicator'


export default branch(({ loading }) => !!loading, renderComponent(LoadingIndicator))
