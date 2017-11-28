import { Router } from 'express'

import getAnswersByQuestionnaireId from './get-answers-by-questionnaire-id'
import create from './create'


const router = Router()


router.get('/:questionnaireId', getAnswersByQuestionnaireId)
router.post('/', create)


export default router
