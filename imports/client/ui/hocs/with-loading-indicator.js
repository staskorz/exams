import { branch, renderComponent } from 'recompose'

import LoadingIndicator from '../components/LoadingIndicator'


export default branch(({ loading }) => !!loading, renderComponent(LoadingIndicator))
