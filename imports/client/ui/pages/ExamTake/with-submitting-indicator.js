import { branch, renderComponent } from 'recompose'

import LoadingIndicator from '../../../../../client/components/LoadingIndicator'


export default branch(({ submitting }) => !!submitting, renderComponent(LoadingIndicator))
