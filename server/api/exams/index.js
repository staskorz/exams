import { Router } from 'express'

import getAll from './get-all'
import getById from './get-by-id'

const router = Router()


router.get('/', getAll)


router.get('/:examId', getById)


export default router
