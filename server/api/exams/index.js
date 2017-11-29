import { Router } from 'express'

import getAll from './get-all'
import getById from './get-by-id'
import update from './update'


const router = Router()


router.get('/', getAll)
router.get('/:examId', getById)
router.put('/:examId', update)


export default router
