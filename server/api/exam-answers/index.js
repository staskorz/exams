import { Router } from 'express'

import ensureRoleOperatorMiddleware from '../../express-middleware/ensure-role-operator'

import getById from './get-by-id'
import getByExamId from './get-by-exam-id'
import getByUserId from './get-by-user-id'
import create from './create'


const router = Router()


router.get('/:examAnswersId', ensureRoleOperatorMiddleware, getById)
router.get('/exam/:examId', ensureRoleOperatorMiddleware, getByExamId)
router.get('/exam/:examId/year/:year', ensureRoleOperatorMiddleware, getByExamId)
router.get('/user/:userId', ensureRoleOperatorMiddleware, getByUserId)
router.get('/user/:userId/year/:year', ensureRoleOperatorMiddleware, getByUserId)
router.post('/:examId', create)


export default router
