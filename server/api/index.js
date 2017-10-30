import { Router, json } from 'express'

import exams from './exams'
import questionnaires from './questionnaires'


const router = Router()


router.use(json())


router.use('/exams', exams)
router.use('/questionnaires', questionnaires)


export default router
