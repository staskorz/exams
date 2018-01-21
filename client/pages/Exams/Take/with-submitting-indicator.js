import { branch, renderComponent } from 'recompose'

import LoadingIndicator from '../../../components/LoadingIndicator'


export default branch(({ submitting }) => !!submitting, renderComponent(LoadingIndicator))
