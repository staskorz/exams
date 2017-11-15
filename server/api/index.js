import { Router, json } from 'express'

import exams from './exams'
import examAnswers from './exam-answers'
import questionnaires from './questionnaires'
import questionnaireAnswers from './questionnaire-answers'


const router = Router()


router.use(json())


router.use('/exams', exams)
router.use('/exam-answers', examAnswers)
router.use('/questionnaires', questionnaires)
router.use('/questionnaire-answers', questionnaireAnswers)


export default router
