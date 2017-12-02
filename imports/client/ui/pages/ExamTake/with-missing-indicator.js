import { branch, renderComponent } from 'recompose'

import ExamMissing from './ExamMissing'


export default branch(({ loadingError }) => loadingError, renderComponent(ExamMissing))
