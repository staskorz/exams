import { Router } from 'express'

import ensureRoleOperatorMiddleware from '../../express-middleware/ensure-role-operator'

import getAll from './get-all'


const router = Router()


router.get('/', ensureRoleOperatorMiddleware, getAll)


export default router
