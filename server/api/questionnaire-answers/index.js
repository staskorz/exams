import { Router } from 'express'

import ensureRoleOperatorMiddleware from '../../express-middleware/ensure-role-operator'

import getAnswersByQuestionnaireId from './get-answers-by-questionnaire-id'
import create from './create'


const router = Router()


router.get('/:questionnaireId', ensureRoleOperatorMiddleware, getAnswersByQuestionnaireId)
router.post('/', create)


export default router
