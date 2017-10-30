import { Router, json } from 'express'

import exams from './exams'
import examAnswers from './exam-answers'
import questionnaires from './questionnaires'


const router = Router()


router.use(json())


router.use('/exams', exams)
router.use('/exam-answers', examAnswers)
router.use('/questionnaires', questionnaires)


export default router
