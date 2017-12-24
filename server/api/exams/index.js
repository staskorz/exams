import { Router } from 'express'

import ensureRoleOperatorMiddleware from '../../express-middleware/ensure-role-operator'

import getAll from './get-all'
import getAllPublished from './get-all-published'
import getById from './get-by-id'
import getExamineeVersion from './get-examinee-version'
import create from './create'
import update from './update'
import setPublished from './set-published'


const router = Router()


router.get('/', ensureRoleOperatorMiddleware, getAll)
router.get('/published', getAllPublished)
router.get('/:examId', ensureRoleOperatorMiddleware, getById)
router.get('/examinee-version/:examId', getExamineeVersion)
router.post('/', ensureRoleOperatorMiddleware, create)
router.put('/:examId', ensureRoleOperatorMiddleware, update)
router.put('/publish/:examId', ensureRoleOperatorMiddleware, setPublished)


export default router
