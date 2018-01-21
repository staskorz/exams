import { branch, renderComponent } from 'recompose'

import ExamMark from './ExamMark'


export default branch(({ mark }) => mark !== null, renderComponent(ExamMark))
