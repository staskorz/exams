import { Router } from 'express'

import getById from './get-by-id'
import getByExamId from './get-by-exam-id'
import getByUserId from './get-by-user-id'
import create from './create'


const router = Router()


router.get('/:examAnswersId', getById)
router.get('/exam/:examId', getByExamId)
router.get('/user/:userId', getByUserId)
router.post('/:examId', create)


export default router
