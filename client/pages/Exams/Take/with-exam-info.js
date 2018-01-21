import { branch, renderComponent } from 'recompose'

import ExamInfo from './ExamInfo'


export default branch(({ started }) => !started, renderComponent(ExamInfo))
