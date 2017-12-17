import { Router } from 'express'
import ensureRoleOperatorMiddleware from '../../express-middleware/ensure-role-operator'

import getAll from './get-all'
import getById from './get-by-id'
import create from './create'
import update from './update'


const router = Router()


router.get('/', ensureRoleOperatorMiddleware, getAll)
router.get('/:questionnaireId', getById)
router.post('/', ensureRoleOperatorMiddleware, create)
router.put('/:questionnaireId', ensureRoleOperatorMiddleware, update)


export default router
