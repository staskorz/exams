import { branch, renderComponent } from 'recompose'

import ExamMarkError from './ExamMarkError'


export default branch(({ submitError }) => submitError, renderComponent(ExamMarkError))
