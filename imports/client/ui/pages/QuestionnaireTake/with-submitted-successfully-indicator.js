import { branch, renderComponent } from 'recompose'

import LoadingIndicator from './SubmittedSuccessfully'


export default branch(({ submitted }) => !!submitted, renderComponent(LoadingIndicator))
