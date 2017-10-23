import { branch, renderComponent } from 'recompose'

import NotFound from './NotFound'


export default branch(({ questionnaire }) => !questionnaire, renderComponent(NotFound))
