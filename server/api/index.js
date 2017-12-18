import { Router, json } from 'express'

import ensureAuthenticationMiddleware from '../express-middleware/ensure-authentication'

import me from './me'
import users from './users'
import exams from './exams'
import examAnswers from './exam-answers'
import questionnaires from './questionnaires'
import questionnaireAnswers from './questionnaire-answers'


const router = Router()


router.use(ensureAuthenticationMiddleware)


router.use(json({
	limit: '50mb',
}))


router.use('/me', me)
router.use('/users', users)
router.use('/exams', exams)
router.use('/exam-answers', examAnswers)
router.use('/questionnaires', questionnaires)
router.use('/questionnaire-answers', questionnaireAnswers)


export default router
