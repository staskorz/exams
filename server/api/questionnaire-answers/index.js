import { Router } from 'express'

import getAnswersByQuestionnaireId from './get-answers-by-questionnaire-id'


const router = Router()


router.get('/:questionnaireId', getAnswersByQuestionnaireId)


export default router
