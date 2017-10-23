import { branch, renderComponent } from 'recompose'

import SubmittedSuccessfully from './SubmittedSuccessfully'


export default branch(({ submitted }) => !!submitted, renderComponent(SubmittedSuccessfully))
